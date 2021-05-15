import {ValidationErrors} from '@angular/forms';

export enum FormStatus {
    INIT = 'INIT',
    INVALID = 'INVALID',
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
}

export class FormState {
    model: any;
    dirty = false;
    status: FormStatus = FormStatus.INIT;
    errors: any = {};
    validationErrors: ValidationErrors = {};

    constructor(props = {}) {
        Object.assign(this, props);
    }

    get isInvalid(): boolean {
        return this.status.toString() === FormStatus.INVALID.toString();
    }

    get isSuccessful(): boolean {
        return this.status.toString() === FormStatus.SUCCESS.toString();
    }
}
