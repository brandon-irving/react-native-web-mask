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

/**
 * Hook to handle input masking for React web and React Native.
 * @see https://github.com/birvingfau/react-native-web-mask
 * @see https://github.com/birvingfau/react-native-web-mask/issues
 * @see https://github.com/birvingfau/react-native-web-mask#readme
 * @param {UseInputMaskProps} props
 * @returns {UseInputMaskReturn}
 * @example
 * // React web
 * const { rawValue, maskedValue, onChange } = useInputMask({ maskType: "phone" });
 * return (
 *   <input type="text" value={maskedValue} onChange={onChange} />
 * )
 *
 * // React Native
 * const { rawValue, maskedValue, onChangeText } = useInputMask({ maskType: "phone" });
 * return (
 *   <TextInput value={maskedValue} onChangeText={onChangeText} />
 * )
 */
export function useInputMask(props?: UseInputMaskProps): UseInputMaskReturn {
  const { maskType, initialValue = "", customMask } = props || {};
  const [rawValue, setRawValue] = useState<string>(initialValue);

  // Helper to pick the correct mask function
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

  const [maskedValue, setMaskedValue] = useState<string>(() => {
    const clampValue = clampRawValueByMaskType(
      maskType || "custom",
      initialValue
    );
    const maskFn = getMaskFunction(maskType || "custom");
    return maskFn(clampValue);
  });

  const handleValueChange = useCallback(
    (input: string | ChangeEvent<HTMLInputElement>) => {
      let newRawValue: string;

      if (typeof input === "object" && "target" in input) {
        newRawValue = input.target.value;
      } else {
        newRawValue = input as string;
      }

      if (!maskType) {
        setRawValue(newRawValue);
        setMaskedValue(newRawValue);
        return;
      }

      newRawValue = clampRawValueByMaskType(maskType, newRawValue);

      const maskFn = getMaskFunction(maskType);
      const newMaskedValue = maskFn(newRawValue);

      if (maskType === "money") {
        const parsedValue = parseCurrencyToNumber(newMaskedValue); // Parse back the raw number
        setRawValue(parsedValue.toFixed(2)); // Store as a decimal (e.g., "100.00")
      } else {
        setRawValue(newRawValue);
      }

      setMaskedValue(newMaskedValue);
    },
    [getMaskFunction, maskType]
  );

  const setValue = useCallback(
    (newRaw: string) => {
      if (!maskType) {
        setRawValue(newRaw);
        setMaskedValue(newRaw);
        return;
      }
      const clampedRaw = clampRawValueByMaskType(maskType, newRaw);
      const maskFn = getMaskFunction(maskType);
      setRawValue(clampedRaw);
      setMaskedValue(maskFn(clampedRaw));
      props?.onChange?.(clampedRaw);
    },
    [maskType, getMaskFunction]
  );

  return {
    maskedValue,
    rawValue,
    onChange: (e: ChangeEvent<HTMLInputElement>) => handleValueChange(e),
    onChangeText: (text: string) => handleValueChange(text),
    setValue,
  };
}
