import { ChangeEvent, useCallback, useState } from "react";
import { parseCurrencyToNumber } from "./maskHelpers";
import {
  clampRawValueByMaskType,
  defaultMask,
  maskCard,
  maskDate,
  maskMoney,
  maskMonthDay,
  maskPhone,
  maskZip,
} from "./maskUtilities";
import {
  MaskFn,
  MaskType,
  UseInputMaskProps,
  UseInputMaskReturn,
} from "./types";

export function useInputMask(props?: UseInputMaskProps): UseInputMaskReturn {
  const { maskType, initialValue = "", customMask, onChange } = props || {};

  // Returns the mask function based on the mask type.
  const getMaskFunction = useCallback(
    (type: MaskType): MaskFn => {
      switch (type) {
        case "phone":
          return maskPhone;
        case "card":
          return maskCard;
        case "zip":
          return maskZip;
        case "date":
          return maskDate;
        case "monthDay":
          return maskMonthDay;
        case "money":
          return maskMoney;
        case "custom":
          return customMask || defaultMask;
        default:
          return defaultMask;
      }
    },
    [customMask]
  );

  // Computes the clamped raw value and the corresponding masked value.
  // In the "money" case, we parse the masked value back into a fixed-decimal string.
  const computeValues = useCallback(
    (value: string) => {
      if (!maskType) {
        return { raw: value, masked: value };
      }
      const clamped = clampRawValueByMaskType(maskType, value);
      const maskFn = getMaskFunction(maskType);
      const masked = maskFn(clamped);
      const raw =
        maskType === "money"
          ? parseCurrencyToNumber(masked).toFixed(2)
          : clamped;
      return { raw, masked };
    },
    [maskType, getMaskFunction]
  );

  // Initialize state using the computed masked value.
  const [rawValue, setRawValue] = useState<string>(initialValue);
  const [maskedValue, setMaskedValue] = useState<string>(() => {
    return computeValues(initialValue).masked;
  });

  // Handles the value change from either a text event or a string value.
  const handleValueChange = useCallback(
    (input: string | ChangeEvent<HTMLInputElement>) => {
      const value =
        typeof input === "object" && "target" in input
          ? input.target.value
          : input;
      const { raw, masked } = computeValues(value);
      setRawValue(raw);
      setMaskedValue(masked);
      onChange?.(raw);
    },
    [computeValues, onChange]
  );

  // Allows programmatic updates of the input value.
  const setValue = useCallback(
    (newRaw: string) => {
      const { raw, masked } = computeValues(newRaw);
      setRawValue(raw);
      setMaskedValue(masked);
      onChange?.(raw);
    },
    [computeValues, onChange]
  );

  return {
    rawValue,
    maskedValue,
    onChange: handleValueChange,
    onChangeText: handleValueChange,
    setValue,
  };
}
