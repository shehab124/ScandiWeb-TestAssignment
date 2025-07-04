export class Attribute {
    name: string;
    type: string;
    values: string[] | null;

    constructor(name: string, type: string, values: string[] | null) {
        this.name = name;
        this.type = type;
        this.values = values;
    }
}
