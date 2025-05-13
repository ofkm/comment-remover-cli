import { processSvelteFile } from "../src/processors/svelteProcessor";
import { processTsFile } from "../src/processors/tsProcessor";
import { readFileSync } from "fs";
import path from "path";

describe("Comment Remover CLI", () => {
  const svelteFilePath = path.join(__dirname, "fixtures", "sample.svelte");
  const tsFilePath = path.join(__dirname, "fixtures", "sample.ts");

  it("should remove comments from .svelte files", () => {
    const originalContent = readFileSync(svelteFilePath, "utf-8");
    const cleanedContent = processSvelteFile(originalContent);
    expect(cleanedContent).not.toContain("<!--");
    expect(cleanedContent).not.toContain("//");
  });

  it("should remove comments from TypeScript files", () => {
    const originalContent = readFileSync(tsFilePath, "utf-8");
    const cleanedContent = processTsFile(originalContent);
    expect(cleanedContent).not.toContain("//");
  });
});
