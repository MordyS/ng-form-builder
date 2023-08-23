import { DropdownQuestion } from "./dropdown.model";
import { Question } from "./question.model";
import { TextboxQuestion } from "./textbox.model";

export class Form {
    id?: string;
    name?: string;
    questions: Array<Question<any> | TextboxQuestion | DropdownQuestion>;
    constructor(options: {
        id?: string;
        name?: string;
        questions?: Array<Question<any> | TextboxQuestion | DropdownQuestion>;
    }) {
        this.id = options.id;
        this.name = options?.name || 'New Form';
        this.questions = options.questions?.sort((a, b) => a.order - b.order) || [];
    }
}