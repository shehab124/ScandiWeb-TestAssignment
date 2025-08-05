import type { Attribute } from "./Attribute";

export interface AttributeSet {
    id: string;
    name: string;
    type: string;
    attributes: Attribute[];
}
