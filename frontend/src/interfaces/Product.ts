import type { Category } from "./Category";
import type { Gallery } from "./Gallery";
import type { Price } from "./Price";
import type { AttributeSet } from "./AttributeSet";


export interface Product {
    id: string;
    name: string;
    inStock: boolean | null;
    description: string | null;
    brand: string | null;
    category: Category | null;
    price: Price;
    gallery: Gallery[];
    attributeSets: AttributeSet[];
    selectedAttributes: Map<string, string>;
    quantity: number;
}
