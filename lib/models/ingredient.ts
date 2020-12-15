export class Ingredient {
    name: string;
    quantityType: QuantityType;
    quantity: number;

    constructor(ingredient: {
        name: string;
        quantity: number;
        quantityType: QuantityType;
    }) {
        this.name = ingredient.name;
        this.quantity = ingredient.quantity;
        this.quantityType = ingredient.quantityType;
    }
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
