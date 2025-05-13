import fs from "fs";
import { removeSvelteComments } from "../utils/commentLogic";

export function processSvelteFile(fileContent: string): string {
  return removeSvelteComments(fileContent);
}

export async function processSvelteFiles(filePaths: string[]): Promise<void> {
  for (const filePath of filePaths) {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const processedContent = processSvelteFile(content);
      fs.writeFileSync(filePath, processedContent);
      console.log(`Processed: ${filePath}`);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }
}
