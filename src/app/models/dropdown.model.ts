import { Question } from './question.model';

export class DropdownQuestion extends Question<string> {
    override controlType: 'dropdown' = 'dropdown';
}