import fs from "fs";
import { removeTSComments } from "../utils/commentLogic";

/**
 * Process a single TypeScript file to remove comments
 */
export function processTsFile(fileContent: string): string {
  return removeTSComments(fileContent);
}

/**
 * Process multiple TypeScript files to remove comments
 */
export async function processTsFiles(filePaths: string[]): Promise<void> {
  for (const filePath of filePaths) {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const processedContent = processTsFile(content);
      fs.writeFileSync(filePath, processedContent);
      console.log(`Processed: ${filePath}`);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }
}
