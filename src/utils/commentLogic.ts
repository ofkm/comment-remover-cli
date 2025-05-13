/**
 * Remove HTML comments (<!-- ... -->) outside <style> blocks,
 * and JS/TS comments except JSDoc from Svelte files.
 */
export function removeSvelteComments(code: string): string {
  // Remove HTML comments outside <style> blocks
  code = code.replace(/<!--[\s\S]*?-->/g, (match, offset) => {
    // Check if inside <style>...</style>
    const before = code.slice(0, offset);
    const openStyle = before.lastIndexOf("<style");
    const closeStyle = before.lastIndexOf("</style>");
    if (openStyle !== -1 && (closeStyle === -1 || closeStyle < openStyle)) {
      // Inside <style>, keep the comment
      return match;
    }
    return "";
  });

  // Remove JS/TS comments except JSDoc
  code = removeJsTsComments(code);

  return code;
}

/**
 * Remove JS/TS comments except JSDoc from TypeScript files.
 */
export function removeTSComments(code: string): string {
  return removeJsTsComments(code);
}

/**
 * Remove // and /* ... *\/ comments except JSDoc (/** ... *\/).
 */
function removeJsTsComments(code: string): string {
  // Remove single-line comments (//...) not in JSDoc
  code = code.replace(/(^|[^:])\/\/.*$/gm, (match, p1) =>
    match.startsWith("/**") ? match : p1
  );

  // Remove block comments except JSDoc
  code = code.replace(/\/\*[\s\S]*?\*\//g, (match) =>
    match.startsWith("/**") ? match : ""
  );

  return code;
}
