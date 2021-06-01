export class Address {
    city: string;
    streetName: string;
    streetNumber: string;
    flatNumber: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
