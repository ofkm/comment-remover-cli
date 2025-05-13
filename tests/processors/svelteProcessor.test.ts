import { processSvelteFile } from "../../src/processors/svelteProcessor";

function normalize(str: string) {
  return str
    .replace(/^[ \t]+|[ \t]+$/gm, "")
    .replace(/\r?\n+/g, "\n")
    .trim();
}

describe("Svelte Processor", () => {
  it("should remove HTML comments from .svelte files", () => {
    const input = `
            <script>
                // This is a single-line comment
                let x = 10; <!-- This is an HTML comment -->
            </script>
            <!-- This is another HTML comment -->
            <style>
                /* This is a CSS comment */
            </style>
            <div>
                <!-- This should be removed -->
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
    const result = processSvelteFile(input);
    expect(normalize(result)).toBe(normalize(expectedOutput));
  });

  it("should preserve JSDoc comments", () => {
    const input = `
            /**
             * This is a JSDoc comment
             */
            let y = 20; // This should be removed
        `;
    const expectedOutput = `
            /**
             * This is a JSDoc comment
             */
            let y = 20; 
        `;
    const result = processSvelteFile(input);
    expect(normalize(result)).toBe(normalize(expectedOutput));
  });
});
