import { processTsFile } from "../../src/processors/tsProcessor";

function normalize(str: string) {
  return str
    .replace(/^[ \t]+|[ \t]+$/gm, "")
    .replace(/\r?\n+/g, "\n")
    .trim();
}

describe("TypeScript Processor", () => {
  it("should remove single-line comments while preserving JSDoc comments", () => {
    const input = `/**
         * This is a JSDoc comment
         */
        // This is a single-line comment
        const x = 5; // Another comment
        const y = 10; /* This is a block comment */
        // JSDoc example
        /**
         * @param {number} a
         * @returns {number}
         */
        function add(a) {
            return a + x; // Add x to a
        }
        `;

    const expectedOutput = `/**
         * This is a JSDoc comment
         */
        const x = 5;
        const y = 10; 
        /**
         * @param {number} a
         * @returns {number}
         */
        function add(a) {
            return a + x; 
        }
        `;

    const result = processTsFile(input);
    expect(normalize(result)).toBe(normalize(expectedOutput));
  });

  it("should not remove JSDoc comments", () => {
    const input = `/**
         * This function does something
         */
        function doSomething() {
            // This comment should be removed
            console.log('Doing something');
        }
        `;

    const expectedOutput = `/**
         * This function does something
         */
        function doSomething() {
            console.log('Doing something');
        }
        `;

    const result = processTsFile(input);
    expect(normalize(result)).toBe(normalize(expectedOutput));
  });
});
