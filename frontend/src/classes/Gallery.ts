export class Gallery {
    id: string;
    url: string;
    order: number;

    constructor(id: string, url: string, order: number) {
        this.id = id;
        this.url = url;
        this.order = order;
    }
}
