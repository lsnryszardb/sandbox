import {Action, State, StateContext} from '@ngxs/store';
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

    @Action(UserActions.GetList)
    getList(ctx: StateContext<UserStateModel>) {
        return this.userService.getList()
            .pipe(
                tap(response => {
                    ctx.patchState({
                        list: [...response],
                    });
                }),
                catchError(error => {
                    console.log(error);
                    return EMPTY;
                })
            );
    }

    @Action(UserActions.Add)
    addUser(ctx: StateContext<UserStateModel>, {user}: UserActions.Add) {
        return this.userService.add(user)
            .pipe(
                tap(response => {
                    console.log(response);
                }),
                catchError(error => {
                    console.log(error);
                    return EMPTY;
                })
            );
    }
}
