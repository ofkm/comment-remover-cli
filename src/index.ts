// This file initializes the comment removal process and integrates the processors for Svelte and TypeScript files.

import { scanFiles } from './utils/fileScanner';
import { processSvelteFiles } from './processors/svelteProcessor';
import { processTsFiles } from './processors/tsProcessor';

export const removeComments = async (directory: string) => {
    const svelteFiles = await scanFiles(directory, '.svelte');
    const tsFiles = await scanFiles(directory, '.ts');

    await processSvelteFiles(svelteFiles);
    await processTsFiles(tsFiles);
};