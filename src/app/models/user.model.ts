export class User {
    firstName: string;
    lastName: string;
    email: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
