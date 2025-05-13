import {
  removeSvelteComments,
  removeTSComments,
} from "../../src/utils/commentLogic";

// Add this helper function
function normalize(str: string) {
  return str
    .replace(/^[ \t]+|[ \t]+$/gm, "")
    .replace(/\r?\n+/g, "\n")
    .trim();
}

describe("removeSvelteComments", () => {
  it("removes single-line and HTML comments from Svelte files", () => {
    const input = `
            <script>
                // This is a single-line comment
                let x = 10; <!-- This is a comment -->
            </script>
            <!-- This is a comment -->
            <style>
                /* This is a CSS comment */
            </style>
            <div>
                <!-- This should remain -->
                <p>Hello World</p>
            </div>
        `;
    const expectedOutput = `
            <script>
                let x = 10; 
            </script>
            <style>
                
            </style>
            <div>
                <p>Hello World</p>
            </div>
        `;
    // Use normalize here
    expect(normalize(removeSvelteComments(input))).toBe(
      normalize(expectedOutput)
    );
  });

  it("does not remove JSDoc comments from Svelte files", () => {
    const input = `
            /**
             * This is a JSDoc comment
             */
            <script>
                // This is a single-line comment
                let x = 10; 
            </script>
        `;
    const expectedOutput = `
            /**
             * This is a JSDoc comment
             */
            <script>
                let x = 10; 
            </script>
        `;
    // Use normalize here
    expect(normalize(removeSvelteComments(input))).toBe(
      normalize(expectedOutput)
    );
  });
});

describe("removeTSComments", () => {
  it("removes single-line and block comments from TypeScript files", () => {
    const input = `
            // This is a single-line comment
            const x = 10; // Another comment
            /* Block comment */
            /**
             * This is a JSDoc comment
             */
            function test() {
                // Comment inside function
                /* Another block */
                return x;
            }
        `;
    const expectedOutput = `
            const x = 10; 
            /**
             * This is a JSDoc comment
             */
            function test() {
                return x;
            }
        `;
    // Use normalize here
    expect(normalize(removeTSComments(input))).toBe(normalize(expectedOutput));
  });

  it("does not remove JSDoc comments from TypeScript files", () => {
    const input = `
            /**
             * This is a JSDoc comment
             */
            const x = 10; // This comment should be removed
        `;
    const expectedOutput = `
            /**
             * This is a JSDoc comment
             */
            const x = 10; 
        `;
    // Use normalize here
    expect(normalize(removeTSComments(input))).toBe(normalize(expectedOutput));
  });
});
