import { Question } from "./question.model";

export class TextboxQuestion extends Question<string> {
    override controlType: 'textbox' = 'textbox';
}