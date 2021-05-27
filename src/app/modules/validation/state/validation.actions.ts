import {ValidationError} from '../models/validation-error.model';

export namespace ValidationActions {
    export class Clear {
        static readonly type = 'ValidationActions.Clear';

        constructor(public path: string) {
        }
    }

    export class Set {
        static readonly type = 'ValidationActions.Set';

        constructor(public path: string, public errors: ValidationError[]) {
        }
    }
}
