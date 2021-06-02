import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {User} from '../models/user.model';
import {UserActions} from '../state/user.actions';
import {UserState} from '../state/user.state';

@Injectable()
export class UserResolver implements Resolve<User> {
    @Select(UserState.activeUser) user$: Observable<User>;

    constructor(
        private store: Store
    ) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        const userId = +route?.params?.userId;
        return this.store.dispatch(new UserActions.GetById(userId))
            .pipe(
                withLatestFrom(this.user$),
                map(([, user]) => user)
            );
    }
}
