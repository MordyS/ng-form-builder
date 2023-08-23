import { Question } from "./question.model";

export class RadioQuestion extends Question<string> {
    override controlType: 'radio' = 'radio';
}