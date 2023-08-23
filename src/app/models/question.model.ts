export class Question<T> {
    value: T | undefined;
    key: string;
    required: boolean;
    order: number;
    controlType: 'textbox' | 'dropdown' | 'textarea' | 'checkbox' | 'radio';
    type: string;
    options: Array<{val:string}>;

    constructor(options: {
        value?: T;
        key?: string;
        required?: boolean;
        order?: number;
        controlType?: 'textbox' | 'dropdown' | 'textarea' | 'checkbox' | 'radio';
        type?: string;
        options?: Array<{val:string}>;
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || 'textbox';
        this.type = options.type || '';
        this.options = options.options || [{val:''}];
    }
}