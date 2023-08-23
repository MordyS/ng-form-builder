import { Question } from "./question.model";

export class CheckboxQuestion extends Question<string> {
    override controlType: 'checkbox' = 'checkbox';
}