import fs from "fs";
import path from "path";

export const scanFiles = (dir: string, extension?: string): string[] => {
  let results: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(scanFiles(filePath, extension));
    } else {
      if (!extension || filePath.endsWith(extension)) {
        results.push(filePath);
      }
    }
  }

  return results;
};
