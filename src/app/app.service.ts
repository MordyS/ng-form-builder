import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Question } from './models/question.model';
import { DropdownQuestion } from './models/dropdown.model';
import { TextboxQuestion } from './models/textbox.model';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Form } from './models/form.model';
import { CheckboxQuestion } from './models/checkbox.model';
import { RadioQuestion } from './models/radio.model';
import { TextareaQuestion } from './models/textarea.model';

@Injectable()
export class AppService {

    public forms: Array<Form> = [];

    constructor() {

        // dummy data for testing
        this.forms.push(...[
            new Form({
                id: '1',
                name: 'General Feedback',
                questions: [
                    new DropdownQuestion({
                        key: 'Rating',
                        options: [{ val: 'Great' }, { val: 'Good' }, { val: 'Solid' }, { val: 'Unproven' }],
                        order: 4
                    }),

                    new TextareaQuestion({
                        key: 'Additional Details',
                        order: 3
                    }),

                    new TextareaQuestion({
                        key: 'Your experience',
                        required: true,
                        order: 2
                    }),

                    new TextboxQuestion({
                        key: 'Name',
                        type: 'text',
                        required: true,
                        order: 1
                    }),

                    new CheckboxQuestion({
                        key: 'Send updates',
                        order: 6
                    }),

                    new RadioQuestion({
                        key: 'Preferred language',
                        options: [{ val: 'JavaScript' }, { val: 'Python' }, { val: 'Spanish' }],
                        order: 5
                    })
                ]
            }),
            new Form({
                id: '2',
                name: 'Lorem Ipsum',
                questions: [

                    new TextboxQuestion({
                        key: 'First name',
                        required: true,
                        order: 1
                    }),

                    new TextboxQuestion({
                        key: 'Email',
                        type: 'email',
                        order: 2
                    })
                ]
            })
        ])
    }

    getForm(formId: string): Form {
        return this.forms.find(f => f.id === formId) || new Form({})
    }

    saveForm(form: Form) {
        if (form.id) {
            const i = this.forms.findIndex(f => f.id === form.id);
            this.forms[i] = form;
        } else {
            const i = Math.max(...this.forms.map(f => Number(f.id || 0)), 0);
            this.forms.push({ ...form, id: String(i + 1) });
        }
    }

    toFormGroup(questions: Question<string>[]) {
        const group: any = {};
        questions.forEach(question => {
            group[question.key] = question.required ?
                new FormControl(question.value || '', Validators.required)
                : new FormControl(question.value || '');
        });
        return new FormGroup(group);
    }
}

