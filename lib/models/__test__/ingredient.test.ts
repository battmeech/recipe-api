import { Ingredient } from '../ingredient';

describe('Tests of the ingredient model', () => {
    it('Successfully instantiates a new ingredient model', () => {
        // Setup
        const ingredient = new Ingredient({
            name: 'Chicken',
            quantity: 100,
            quantityType: 'g',
        });

        // Assert
        expect(ingredient.name).toStrictEqual('Chicken');
        expect(ingredient.quantity).toStrictEqual(100);
        expect(ingredient.quantityType).toStrictEqual('g');
    });
});
