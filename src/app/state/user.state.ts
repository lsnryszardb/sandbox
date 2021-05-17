import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {FormState} from '../models/form-state.model';
import {User} from '../models/user.model';
import {UserActions} from './user.actions';
import {UserService} from '../services/user.service';

interface UserStateModel {
    form: FormState;
    list: User[];
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        form: new FormState(),
        list: [],
    }
})
@Injectable()
export class UserState {

    constructor(
        private userService: UserService
    ) {
    }

    @Selector()
    static validationErrors(state) {
        return state.form.validationErrors;
    }

    @Action(UserActions.GetList)
    getList(ctx: StateContext<UserStateModel>) {
        return this.userService.getList()
            .pipe(
                tap(response => {
                    ctx.patchState({
                        list: [...response],
                    });
                }),
                catchError(() => {
                    return EMPTY;
                })
            );
    }

    @Action(UserActions.Add)
    addUser(ctx: StateContext<UserStateModel>, {user}: UserActions.Add) {
        return this.userService.add(user)
            .pipe(
                tap(response => {
                    ctx.patchState({
                        form: new FormState({
                            validationErrors: []
                        }),
                    });
                }),
                catchError(({error}) => {
                    const state = ctx.getState();
                    const validationErrors = {};
                    if (Array.isArray(error)) {
                        error.forEach(validationError => {
                            if (!validationErrors[validationError?.field]) {
                                validationErrors[validationError?.field] = {};
                            }
                            validationErrors[validationError?.field][validationError?.description] = true;
                        });
                    }
                    ctx.patchState({
                        form: new FormState({
                            ...state.form,
                            validationErrors
                        }),
                    });
                    return EMPTY;
                })
            );
    }
}
