

export class Contact {
    type: 'EMAIL' | 'PHONE';
    value: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
