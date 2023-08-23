import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { Form } from '../models/form.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Subject, take, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit, OnDestroy {

  form: Form = new Form({});
  private _destroy = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AppService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this._destroy)).subscribe(params => {
      this.form = new Form(JSON.parse(JSON.stringify(this.service.getForm(params['id']))));
    });
  }

  addQuestion() {
    this.form.questions.push(new Question({ order: 1 + Math.max(...this.form.questions.map(question => question.order), 0) }))
  }

  get isValid() {
    return this.form.name
      && this.form.questions.length
      && this.form.questions.every((question) =>
        question.key
        && (
          !['dropdown', 'radio'].includes(question.controlType)
          || (question.options.length && question.options.every(q => q.val))
        )
      )
  }

  save() {
    this.service.saveForm(this.form);
    this.router.navigate(['']);
    this.snackBar.open('Form Saved');
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.form.questions, event.previousIndex, event.currentIndex);

    // set the order of this question to be between the previous and the next questions
    const prev = this.form.questions[event.currentIndex - 1]?.order || 0;
    const next = this.form.questions[event.currentIndex + 1]?.order;
    const last = this.form.questions[this.form.questions.length - 1].order;
    const newOrder = next ? prev + ((next - prev) / 2) : last + 1;
    this.form.questions[event.currentIndex].order = newOrder;
  }

  ngOnDestroy() {
    this._destroy.next()
    this._destroy.complete()
  }
}
