export class Attribute {
    name: string;
    type: string;
    values: string[];

    constructor(name: string, type: string, values: string[]) {
        this.name = name;
        this.type = type;
        this.values = values;
    }
}
