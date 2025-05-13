import fs from "fs";
import path from "path";

export const scanFiles = async (
  dir: string,
  extension?: string
): Promise<string[]> => {
  let results: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules directory
      if (file === "node_modules") {
        console.log("Skipping node_modules directory");
        continue;
      } else if (file === ".git") {
        console.log("Skipping .git directory");
        continue;
      } else if (file === ".svelte-kit") {
        console.log("Skipping .svelte-kit directory");
        continue;
      }

      // Recursively scan subdirectories
      results = results.concat(await scanFiles(filePath, extension));
    } else {
      // Only include files with matching extension
      if (!extension || filePath.endsWith(extension)) {
        results.push(filePath);
      }
    }
  }

  return results;
};
