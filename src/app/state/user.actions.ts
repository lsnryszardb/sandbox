import {User} from '../models/user.model';

export namespace UserActions {
    export class Add {
        static readonly type = 'UserActions.Add';

        constructor(public user: User) {
        }
    }

    export class GetById {
        static readonly type = 'UserActions.GetById';

        constructor(public id: number) {
        }
    }

    export class GetList {
        static readonly type = 'UserActions.GetList';
    }
}
