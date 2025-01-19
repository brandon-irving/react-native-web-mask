/**
 * Strips all non-digit characters from a string.
 */
export function stripNonDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Ensures the string doesn't exceed a certain length.
 */
export function limitLength(value: string, maxLength: number): string {
  return value.slice(0, maxLength);
}

/**
 * Inserts a separator (e.g. '/') between chunks of specified sizes.
 *
 * Example:
 *   insertChunks("12345", [2, 2, 1], "/")
 *   -> "12/34/5"
 */
export function insertChunks(
  value: string,
  chunkSizes: number[],
  separator: string
): string {
  let result = "";
  let startIndex = 0;

  chunkSizes.forEach((size) => {
    const chunk = value.slice(startIndex, startIndex + size);
    if (chunk) {
      if (result) {
        result += separator;
      }
      result += chunk;
    }
    startIndex += size;
  });

  if (startIndex < value.length) {
    result += value.slice(startIndex);
  }

  return result;
}

/**
 * A flexible RegExp replace helper.
 * Pass in a pattern (RegExp) and a replacer string or function.
 *
 * Example:
 *   applyRegexReplace("12345", /\d/g, "*")
 *   -> "*****"
 */
export function applyRegexReplace(
  value: string,
  pattern: RegExp,
  replaceWith: string
): string {
  return value.replace(pattern, replaceWith);
}

/**
 * Clamps a numeric string (after parsing to a number) within min and max range.
 * Useful if you want to ensure months/days remain in valid ranges, etc.
 *
 * Example:
 *   clampDigits("13", 1, 12) -> "12"
 */
export function clampDigits(
  numericString: string,
  min: number,
  max: number
): string {
  if (!numericString) return numericString;
  const numValue = parseInt(numericString, 10);
  if (isNaN(numValue)) return numericString;

  if (numValue < min) return String(min).padStart(numericString.length, "0");
  if (numValue > max) return String(max);
  return numericString;
}

/**
 * Takes a string that is expected to contain a currency value and extracts
 * the number from it. Any non-numeric characters are removed and the
 * result is parsed as a float. If the result is NaN, returns 0.
 *
 * @param {string} currency - The currency string to parse
 * @returns {number} The parsed number, or 0 if parsing fails
 */
export function parseCurrencyToNumber(currency: string): number {
  if (!currency) return 0;
  const numericString = currency.replace(/[^0-9.-]/g, "").trim();
  return parseFloat(numericString) || 0;
}
