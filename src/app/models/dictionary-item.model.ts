export class DictionaryItem {
    code: string;
    description: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}
