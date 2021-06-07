import {User} from '../../models/user.model';

export namespace DemoActions {
    export class Set {
        static readonly type = 'DemoActions.Set';

        constructor(public user: User) {
        }
    }

    export class GetById {
        static readonly type = 'DemoActions.GetById';

        constructor(public id: number) {
        }
    }

    export class GetList {
        static readonly type = 'DemoActions.GetList';
    }
}
