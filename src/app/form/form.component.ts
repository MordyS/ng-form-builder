import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  questions: Array<Question<any>> = [];
  formName?: string;
  form!: FormGroup;
  payLoad = '';

  constructor(private route: ActivatedRoute, private router: Router, private service: AppService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe(params => {
      if (!this.service.getForm(params['id']).id) {
        this.router.navigate(['']);
        this.snackBar.open('Form Not Found');
      }
      this.questions = this.service.getForm(params['id']).questions;
      this.formName = this.service.getForm(params['id']).name;
      this.form = this.service.toFormGroup(this.questions as Question<string>[]);
    });
  }

  onSubmit() {
    this.payLoad = this.form.getRawValue();
    console.log(this.payLoad)
    this.snackBar.open('Form Submitted');
  }
}
