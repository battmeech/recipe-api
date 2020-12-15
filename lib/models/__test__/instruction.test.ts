import { Instruction } from '../instruction';

describe('Tests of the instruction model', () => {
    it('Successfully instantiates a new instruction model', () => {
        // Setup
        const instruction = new Instruction({
            instruction: 'Cut the chicken',
            number: 1,
        });

        // Assert
        expect(instruction.instruction).toStrictEqual('Cut the chicken');
        expect(instruction.number).toStrictEqual(1);
    });
});
