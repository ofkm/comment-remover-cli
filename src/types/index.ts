export interface FileProcessingOptions {
    inputPath: string;
    outputPath?: string;
    recursive?: boolean;
}

export interface CommentRemovalResult {
    filePath: string;
    originalContent: string;
    modifiedContent: string;
}

export type CommentType = 'singleLine' | 'multiLine' | 'jsDoc';