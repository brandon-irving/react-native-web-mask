import { act, renderHook } from "@testing-library/react";
import { useInputMask } from "../useInputMask";
const generateFakeEvent = (value: string) =>
  ({
    target: {
      value,
    },
  } as React.ChangeEvent<HTMLInputElement>);
describe("useInputMask (Web onChange tests)", () => {
  it("should handle changes for phone mask via onChange (web)", () => {
    const { result } = renderHook(() => useInputMask({ maskType: "phone" }));

    act(() => {
      result.current.onChange(generateFakeEvent("9876543210"));
    });

    expect(result.current.rawValue).toBe("9876543210");
    expect(result.current.maskedValue).toBe("(987) 654-3210");
  });

  it("should handle date mask via onChange (web)", () => {
    const { result } = renderHook(() => useInputMask({ maskType: "date" }));

    act(() => {
      result.current.onChange(generateFakeEvent("12345678"));
    });

    expect(result.current.rawValue).toBe("12345678");
    expect(result.current.maskedValue).toBe("12/34/5678");
  });

  it("should handle custom mask via onChange (web)", () => {
    const customMaskFn = (value: string) => `PREFIX-${value}`;

    const { result } = renderHook(() =>
      useInputMask({ maskType: "custom", customMask: customMaskFn })
    );

    act(() => {
      const event = {
        target: { value: "Hello" },
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.onChange(event);
    });

    expect(result.current.rawValue).toBe("Hello");
    expect(result.current.maskedValue).toBe("PREFIX-Hello");
  });
});
describe("'useInputMask (React Native onChangeText tests)", () => {
  it("should handle changes for phone mask", () => {
    const { result } = renderHook(() => useInputMask({ maskType: "phone" }));

    act(() => {
      result.current.onChangeText("9876543210");
    });

    expect(result.current.rawValue).toBe("9876543210");
    expect(result.current.maskedValue).toBe("(987) 654-3210");
  });

  it("should handle money mask changes", () => {
    const { result } = renderHook(() => useInputMask({ maskType: "money" }));

    act(() => {
      result.current.onChangeText("1234.5");
    });
    expect(result.current.rawValue).toBe("1234.5");
    expect(result.current.maskedValue).toBe("1,234.50");
  });

  it("should clamp date length to 10 characters (MM/DD/YYYY)", () => {
    const { result } = renderHook(() => useInputMask({ maskType: "date" }));

    act(() => {
      result.current.onChangeText("12345678901234567");
    });
    expect(result.current.rawValue).toBe("12345678");
    expect(result.current.maskedValue).toBe("12/34/5678");
  });

  it("should handle monthDay mask (MM/DD)", () => {
    const { result } = renderHook(() => useInputMask({ maskType: "monthDay" }));

    act(() => {
      result.current.onChangeText("12345");
    });
    expect(result.current.rawValue).toBe("1234");
    expect(result.current.maskedValue).toBe("12/34");
  });

  it("should support customMask callback", () => {
    const customMaskFn = jest.fn().mockImplementation((value: string) => {
      return `Custom: ${value}`;
    });

    const { result } = renderHook(() =>
      useInputMask({ maskType: "custom", customMask: customMaskFn })
    );

    act(() => {
      result.current.onChangeText("ABC123");
    });

    expect(result.current.rawValue).toBe("ABC123");
    expect(result.current.maskedValue).toBe("Custom: ABC123");
    expect(customMaskFn).toHaveBeenCalledWith("ABC123");
  });
});

describe("useInputMask", () => {
  it("should format initial value for phone mask", () => {
    const { result } = renderHook(() =>
      useInputMask({ maskType: "phone", initialValue: "1234567890" })
    );
    expect(result.current.rawValue).toBe("1234567890");
    expect(result.current.maskedValue).toBe("(123) 456-7890");
  });

  it("should allow manually setting the value via setValue", () => {
    const { result } = renderHook(() => useInputMask({ maskType: "phone" }));

    act(() => {
      result.current.setValue("5555555555");
    });
    expect(result.current.rawValue).toBe("5555555555");
    expect(result.current.maskedValue).toBe("(555) 555-5555");
  });

  it("should return raw value if no mask type is provided", () => {
    const { result } = renderHook(() => useInputMask());

    act(() => {
      result.current.setValue("5555555555");
    });
    expect(result.current.rawValue).toBe("5555555555");
    expect(result.current.maskedValue).toBe("5555555555");
  });
});
