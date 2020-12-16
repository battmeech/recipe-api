import { Recipe } from '../../models/recipe';
import { recipeValidationRules } from '../recipeValidation';

describe('Tests of the recipe validation service', () => {
    it('A valid recipe succeeds validation', () => {
        // Setup
        const recipeToTest: Recipe = {
            cookingTime: '20 mins',
            description: 'This is a test recipe',
            difficulty: 'HARD',
            ingredients: [],
            method: [],
            name: 'Test recipe',
            prepTime: '5 mins',
            serves: 1,
        };

        // Run test
        const { error } = recipeValidationRules.validate(recipeToTest);

        // Assert
        expect(error).toBeFalsy();
    });

    it('A recipe with a missing field gives a validation error', () => {
        // Setup
        const recipeToTest = {
            cookingTime: '20 mins',
            description: 'This is a test recipe',
            difficulty: 'HARD',
            ingredients: [],
            method: [],
            prepTime: '5 mins',
            serves: 1,
        };

        // Run test
        const { error } = recipeValidationRules.validate(recipeToTest);

        // Assert
        expect(error?.message).toStrictEqual('"name" is required');
    });

    it('A recipe with an invalid field gives a validation error', () => {
        // Setup
        const recipeToTest: Recipe = {
            cookingTime: '20 mins',
            description: 'This is a test recipe',
            difficulty: 'HARD',
            ingredients: [],
            method: [],
            name: 'a',
            prepTime: '5 mins',
            serves: 1,
        };

        // Run test
        const { error } = recipeValidationRules.validate(recipeToTest);

        // Assert
        expect(error?.message).toStrictEqual(
            '"name" length must be at least 2 characters long'
        );
    });

    it('A recipe with an invalid nested object gives a validation error', () => {
        // Setup
        const recipeToTest = {
            cookingTime: '20 mins',
            description: 'This is a test recipe',
            difficulty: 'HARD',
            ingredients: [{ quantityType: 'g', name: 'Cheese' }],
            method: [],
            name: 'ab',
            prepTime: '5 mins',
            serves: 1,
        };

        // Run test
        const { error } = recipeValidationRules.validate(recipeToTest);

        // Assert
        expect(error?.message).toStrictEqual(
            '"ingredients[0].quantity" is required'
        );
    });
});
