import { MaskFn, MaskType } from "./types";

/**
 * Format a value as a phone number in the format (###) ###-####
 * @param {string} value the value to format
 * @returns {string} the formatted value
 * @example
 * maskPhone("1234567890") -> "(123) 456-7890"
 */
export const maskPhone: MaskFn = (value) => {
  const digits = value.replace(/\D/g, "");
  const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return digits;

  let masked = "";
  if (match[1]) masked = `(${match[1]}`;
  if (match[2]) masked += `) ${match[2]}`;
  if (match[3]) masked += `-${match[3]}`;
  return masked;
};

/**
 * Format a value as a decimal number in the format 0.00
 * @param {string} value the value to format
 * @returns {string} the formatted value
 * @example
 * maskMoney("1234.56") -> "1,234.56"
 */
export const maskMoney: MaskFn = (value) => {
  const numericValue = value.replace(/[^\d.]/g, "");
  let floatValue = parseFloat(numericValue || "0");
  if (isNaN(floatValue)) floatValue = 0;

  return floatValue.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Format a value as a credit card number in the format XXXX XXXX XXXX XXXX
 * @param {string} value the value to format
 * @returns {string} the formatted value
 * @example
 * maskCard("1234567890123456") -> "1234 5678 9012 3456"
 */
export const maskCard: MaskFn = (value) => {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

/**
 * Format a value as a zip code in the format 12345-6789
 * @param {string} value the value to format
 * @returns {string} the formatted value
 * @example
 * maskZip("123456789") -> "12345-6789"
 */
export const maskZip: MaskFn = (value) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length > 5) {
    return digits.slice(0, 5) + "-" + digits.slice(5, 9);
  }
  return digits;
};

/**
 * Format a value as a date in the format MM/DD/YYYY
 * @param {string} value the value to format
 * @returns {string} the formatted value
 * @example
 * maskDate("12345678") -> "01/23/4567"
 */
export const maskDate: MaskFn = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const match = digits.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
  if (!match) return digits;

  const [, mm, dd, yyyy] = match;

  let masked = "";
  if (mm) masked = mm;
  if (dd) masked += (masked ? "/" : "") + dd;
  if (yyyy) masked += (masked ? "/" : "") + yyyy;

  return masked;
};

/**
 * Format a value as a month/day in the format MM/DD
 * @param {string} value the value to format
 * @returns {string} the formatted value
 * @example
 * maskMonthDay("1231") -> "12/31"
 */
export const maskMonthDay: MaskFn = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  const match = digits.match(/^(\d{0,2})(\d{0,2})$/);
  if (!match) return digits;

  const [, mm, dd] = match;

  let masked = "";
  if (mm) masked = mm;
  if (dd) masked += (masked ? "/" : "") + dd;

  return masked;
};

export const defaultMask: MaskFn = (value) => value;

/**
 * Given a mask type and a raw value, clamps the raw value to a suitable
 * length for the given mask type. This is useful for limiting the length
 * of input values when the user is typing, so that the formatting doesn't
 * get out of hand.
 *
 * For example, for a phone number, the raw value will be clamped to 10
 * digits. For a date, it will be clamped to 8 digits (MMDDYYYY).
 *
 * Note that this function does not remove any characters from the raw
 * value - it simply truncates it to the desired length. This means that
 * if the user enters a non-digit character, it will still be included
 * in the final output.
 *
 * @param {MaskType} type the mask type to use for clamping
 * @param {string} raw the raw value to clamp
 * @returns {string} the clamped raw value
 * @example
 * clampRawValueByMaskType("phone", "1234567890333") -> "1234567890"
 */
export function clampRawValueByMaskType(type: MaskType, raw: string): string {
  switch (type) {
    case "phone":
      // phone numbers typically max out at 10 digits
      return raw.replace(/\D/g, "").slice(0, 10);
    case "date":
      // date => "MMDDYYYY" => 8 digits
      return raw.replace(/\D/g, "").slice(0, 8);
    case "monthDay":
      // monthDay => "MMDD" => 4 digits
      return raw.replace(/\D/g, "").slice(0, 4);
    case "zip":
      // US ZIP => up to 9 digits (ZIP+4)
      return raw.replace(/\D/g, "").slice(0, 9);
    case "card":
      // typical credit card => up to 16 digits (or 19 if you want)
      return raw.replace(/\D/g, "").slice(0, 16);
    // money => no strict digit cap in many cases
    // custom => we won't force a clamp (the customMask can do it if desired)
    default:
      return raw;
  }
}
