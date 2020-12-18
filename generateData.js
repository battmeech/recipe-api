const faker = require('faker/locale/en');
const request = require('request');

for (let i = 0; i < 20; i++) {
    const ingredients = [];
    for (let j = 0; j < 5; j++) {
        ingredients.push({
            name: faker.name.findName(),
            quantity: faker.random.number(),
            quantityType: 'g',
        });
    }

    const method = [];
    for (let m = 0; m < 12; m++) {
        method.push({
            number: m,
            instruction: faker.lorem.words(),
        });
    }

    const recipe = {
        name: `Recipe ${String.fromCharCode(97 + i)}`,
        serves: faker.random.number(),
        prepTime: faker.random.number(),
        cookingTime: faker.random.number(),
        description: faker.lorem.paragraph(),
        difficulty: faker.helpers.randomize(['EASY', 'HARD', 'MEDIUM']),
        ingredients,
        method,
    };

    request({
        url: 'http://localhost:3000/recipe',
        method: 'POST',
        json: true,
        body: recipe,
    });
}
