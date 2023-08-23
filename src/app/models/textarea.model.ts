import { Question } from "./question.model";

export class TextareaQuestion extends Question<string> {
    override controlType: 'textarea' = 'textarea';
}