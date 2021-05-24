import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {catchError, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {User} from '../models/user.model';
import {UserActions} from './user.actions';
import {UserService} from '../services/user.service';
import {ValidationService} from '../services/validation.service';

interface UserStateModel {
    list: User[];
    validationErrors: ValidationErrors;
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        list: [],
        validationErrors: {},
    }
})
@Injectable()
export class UserState {

    constructor(
        private validationService: ValidationService,
        private userService: UserService
    ) {
    }

    @Selector()
    static validationErrors(state) {
        return state.validationErrors;
    }

    @Action(UserActions.GetList)
    getList(ctx: StateContext<UserStateModel>) {
        return this.userService.getList()
            .pipe(
                tap(response => {
                    ctx.patchState({
                        list: response.map(item => new User(item)),
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
                    const {list} = ctx.getState();
                    ctx.patchState({
                        list: [new User(response), ...list],
                        validationErrors: []
                    });
                }),
                catchError(({error}) => {
                    const validationErrors = {...this.validationService.parseErrorResponse(error)};
                    ctx.patchState({
                        validationErrors
                    });
                    return EMPTY;
                })
            );
    }
}
