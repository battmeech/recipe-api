export class Instruction {
    /** Represents the index of this instruction */
    number: number;
    /** The text which instructs the reader */
    instruction: string;

    constructor(instruction: { instruction: string; number: number }) {
        this.number = instruction.number;
        this.instruction = instruction.instruction;
    }
}
