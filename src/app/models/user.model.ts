import {Address} from './address.model';
import {Contact} from './contact.model';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
    contacts: Contact[];

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
