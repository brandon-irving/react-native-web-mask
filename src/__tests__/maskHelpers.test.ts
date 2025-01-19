import {
  applyRegexReplace,
  clampDigits,
  insertChunks,
  limitLength,
  parseCurrencyToNumber,
  stripNonDigits,
} from "../maskHelpers";

describe("maskHelpers", () => {
  describe("stripNonDigits", () => {
    it("should remove all non-digit characters", () => {
      expect(stripNonDigits("abc123xyz")).toBe("123");
      expect(stripNonDigits("12-34.56")).toBe("123456");
      expect(stripNonDigits("")).toBe("");
    });
  });

  describe("limitLength", () => {
    it("should limit string length to the specified max", () => {
      expect(limitLength("123456", 4)).toBe("1234");
      expect(limitLength("1234", 10)).toBe("1234");
    });
  });

  describe("insertChunks", () => {
    it("should insert separators at specified chunk sizes", () => {
      expect(insertChunks("12345", [2, 2, 1], "/")).toBe("12/34/5");
      // for left over chunks, we just append it to the last separator
      expect(insertChunks("1234567", [2, 2, 1], "-")).toBe("12-34-567");
    });

    it("should handle empty string gracefully", () => {
      expect(insertChunks("", [2, 2], "/")).toBe("");
    });
  });

  describe("applyRegexReplace", () => {
    it("should apply the given RegExp replacement", () => {
      const pattern = /(\d{3})(\d{2})(\d{4})/; // typical US SSN pattern
      const input = "123456789";
      // Capture the first ($1) three digits, the second ($2) two digits, and the third ($3) four digits
      const replaced = applyRegexReplace(input, pattern, "$1-$2-$3");
      expect(replaced).toBe("123-45-6789");
    });
  });

  describe("clampDigits", () => {
    it("should clamp numeric strings within a min/max range", () => {
      expect(clampDigits("0", 1, 12)).toBe("1");
      expect(clampDigits("13", 1, 12)).toBe("12");
      expect(clampDigits("05", 1, 12)).toBe("05");
    });

    it("should return the input if it is not numeric", () => {
      expect(clampDigits("abc", 1, 12)).toBe("abc");
    });

    it("should do nothing if within range", () => {
      expect(clampDigits("5", 1, 12)).toBe("5");
      expect(clampDigits("12", 1, 12)).toBe("12");
    });
  });

  describe("parseCurrencyToNumber", () => {
    it("should convert currency strings to numbers", () => {
      expect(parseCurrencyToNumber("0")).toBe(0);
      expect(parseCurrencyToNumber("$100.00")).toBe(100);
      expect(parseCurrencyToNumber("$1,230.30")).toBe(1230.3);
    });
  });
});
