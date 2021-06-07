import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {User} from '../../models/user.model';
import {DemoActions} from './demo.actions';
import {UserService} from '../../services/user.service';
import {ValidationStateModel} from '../../modules/validation/models/validation-state.model';
import {Router} from '@angular/router';
import {ValidationService} from '../../modules/validation/services/validation.service';

interface UserStateModel extends ValidationStateModel {
    activeUser: User;
    list: User[];
}

@State<UserStateModel>({
    name: DemoState.STATE_NAME,
    defaults: {
        activeUser: null,
        list: [],
        validationErrors: null,
    }
})
@Injectable()
export class DemoState {
    static readonly STATE_NAME = 'demo';

    constructor(
        private router: Router,
        private userService: UserService,
        private validationService: ValidationService
    ) {
    }

    @Selector()
    static activeUser(state) {
        return state.activeUser;
    }

    @Selector()
    static users(state) {
        return state.list;
    }

    @Selector()
    static validationErrors(state) {
        return state.validationErrors;
    }

    @Action(DemoActions.GetById)
    getById(ctx: StateContext<UserStateModel>, {id}: DemoActions.GetById) {
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

    @Action(DemoActions.GetList)
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

    @Action(DemoActions.Set)
    setUser(ctx: StateContext<UserStateModel>, {user}: DemoActions.Set) {
        const request = user?.id
            ? this.userService.edit(user)
            : this.userService.add(user);
        return request
            .pipe(
                tap(response => {
                    const {list} = ctx.getState();
                    ctx.patchState({
                        list: [new User(response), ...list],
                        validationErrors: null
                    });
                    this.router.navigate(['/users']);
                }),
                catchError(({error}) => {
                    const validationErrors = this.validationService.parseErrorResponse(error);
                    ctx.patchState({
                        validationErrors
                    });
                    return EMPTY;
                })
            );
    }
}
