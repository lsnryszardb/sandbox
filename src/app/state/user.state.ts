import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {User} from '../models/user.model';
import {UserActions} from './user.actions';
import {UserService} from '../services/user.service';
import {ValidationStateModel} from '../modules/validation/models/validation-state.model';
import {ValidationActions} from '../modules/validation/state/validation.actions';

interface UserStateModel extends ValidationStateModel {
    activeUser: User;
    list: User[];
}

@State<UserStateModel>({
    name: UserState.STATE_NAME,
    defaults: {
        activeUser: null,
        list: [],
        validationErrors: null,
    }
})
@Injectable()
export class UserState {
    static readonly STATE_NAME = 'user';

    constructor(
        private userService: UserService
    ) {
    }

    @Selector()
    static users(state) {
        return state.list;
    }

    @Selector()
    static validationErrors(state) {
        return state.validationErrors;
    }

    @Action(UserActions.GetById)
    getById(ctx: StateContext<UserStateModel>, {id}: UserActions.GetById) {
        return this.userService.get(id)
            .pipe(
                map(response => {
                    return ctx.patchState({
                        activeUser: new User(response),
                    });
                }),
                catchError(() => {
                    return EMPTY;
                })
            );
    }

    @Action(UserActions.GetList)
    getList(ctx: StateContext<UserStateModel>) {
        return this.userService.getList()
            .pipe(
                map(response => {
                    return ctx.patchState({
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
                    return ctx.dispatch(new ValidationActions.Set(UserState.STATE_NAME, error));
                })
            );
    }
}
