#!/usr/bin/env node
// This file initializes the comment removal process and integrates the processors for Svelte and TypeScript files.

import { scanFiles } from "./utils/fileScanner";
import { processSvelteFiles } from "./processors/svelteProcessor";
import { processTsFiles } from "./processors/tsProcessor";

export const removeComments = async (directory: string) => {
  console.log(`Scanning directory: ${directory}`);
  const svelteFiles = await scanFiles(directory, ".svelte");
  const tsFiles = await scanFiles(directory, ".ts");

  console.log(
    `Found ${svelteFiles.length} Svelte files and ${tsFiles.length} TypeScript files`
  );

  await processSvelteFiles(svelteFiles);
  await processTsFiles(tsFiles);

  console.log("All files processed successfully");
};

// Run as CLI if this file is executed directly
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: comment-remover-cli <directory>");
    process.exit(1);
  }

  const directory = args[0];

  removeComments(directory)
    .then(() => console.log("✅ Comment removal complete"))
    .catch((error) => {
      console.error("❌ Error:", error);
      process.exit(1);
    });
}
