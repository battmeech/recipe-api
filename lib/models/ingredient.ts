export interface Ingredient {
    name: string;
    quantityType: QuantityType;
    quantity: number;
}

export type QuantityType =
    | 'g'
    | 'kg'
    | 'American cup'
    | 'British cup'
    | 'lb'
    | 'ounce'
    | 'tsp'
    | 'tbsp';
