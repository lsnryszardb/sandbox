import {Injectable} from '@angular/core';
import {getActionTypeFromInstance, NgxsNextPluginFn, NgxsPlugin, setValue} from '@ngxs/store';
import {ValidationActions} from './validation.actions';
import {ValidationService} from '../services/validation.service';

@Injectable()
export class NgxsValidationPlugin implements NgxsPlugin {
    constructor(private validationService: ValidationService) {
    }

    handle(state: any, event: any, next: NgxsNextPluginFn) {
        const type = getActionTypeFromInstance(event);
        let nextState = {...state};
        const pathState = state[event.path];

        if (type === ValidationActions.Set.type) {
            const {errors} = event;
            const validationErrors = this.validationService.parseErrorResponse(errors);
            nextState = setValue(nextState, `${event.path}`, {...pathState, validationErrors});
        }

        if (type === ValidationActions.Clear.type) {
            nextState = setValue(nextState, `${event.path}`, {
                ...pathState,
                validationErrors: null
            });
        }

        return next(nextState, event);
    }
}
