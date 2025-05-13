# Comment Remover CLI

This project provides a command-line interface (CLI) tool for removing comments from `.svelte` and TypeScript files while preserving JSDoc comments. It is designed to help clean up codebases by eliminating unnecessary comments.

## Features

- Removes comments from `.svelte` files using both `<!-- -->` and `//` syntax.
- Removes single-line comments from TypeScript files using `//`.
- Preserves JSDoc comments in both file types.
- Scans the file system for `.svelte` and `.ts` files for processing.

## Installation

To install the package, run:

```
npm install comment-remover-cli
```

## Usage

After installation, you can use the CLI to remove comments from your codebase. Run the following command:

```
npx comment-remover-cli <path-to-your-codebase>
```

Replace `<path-to-your-codebase>` with the path to the directory containing your `.svelte` and TypeScript files.

## Development

To contribute to the project, clone the repository and install the dependencies:

```
git clone https://github.com/ofkm/comment-remover-cli
cd comment-remover-cli
npm install
```

### Running Tests

To run the tests, use:

```
npm test
```

### File Structure

- `bin/cli.ts`: Entry point for the CLI.
- `src/index.ts`: Main functionality of the package.
- `src/processors/svelteProcessor.ts`: Processes `.svelte` files.
- `src/processors/tsProcessor.ts`: Processes TypeScript files.
- `src/utils/fileScanner.ts`: Scans the file system for relevant files.
- `src/utils/commentLogic.ts`: Logic for identifying and removing comments.
- `src/types/index.ts`: Type definitions used throughout the project.
- `tests/`: Contains unit tests for various components of the project.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
