import { Category } from "./Category";
import { Gallery } from "./Gallery";
import { Price } from "./Price";
import { Attribute } from "./Attribute";

export class Product {
    id: string;
    name: string;
    inStock: boolean | null;
    description: string | null;
    brand: string | null;
    category: Category | null;
    price: Price;
    gallery: Gallery[];
    attributes: Attribute[];

    constructor(id: string, name: string, inStock: boolean | null, description: string | null, brand: string | null, category: Category | null = null, price: Price, gallery: Gallery[], attributes: Attribute[]) {
        this.id = id;
        this.name = name;
        this.inStock = inStock;
        this.description = description;
        this.brand = brand;
        this.category = category;
        this.price = price;
        this.gallery = gallery;
        this.attributes = attributes;
    }
}
