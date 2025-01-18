import { ChangeEvent, useCallback, useState } from "react";
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
 )
 *
 * // React Native
 * const { rawValue, maskedValue, onChangeText } = useInputMask({ maskType: "phone" });
 * return (
 *   <TextInput value={maskedValue} onChangeText={onChangeText} />
 * )
 */
export function useInputMask({
  maskType,
  initialValue = "",
  customMask,
}: UseInputMaskProps): UseInputMaskReturn {
  const [rawValue, setRawValue] = useState<string>(initialValue);

  // Helper to pick the correct mask function
  const getMaskFunction = useCallback(
    (type: MaskType): MaskFn => {
      switch (type) {
        case "phone":
          return maskPhone;
        case "money":
          return maskMoney;
        case "card":
          return maskCard;
        case "zip":
          return maskZip;
        case "date":
          return maskDate;
        case "monthDay":
          return maskMonthDay;
        case "custom":
          return customMask || defaultMask;
        default:
          return defaultMask;
      }
    },
    [customMask]
  );

  const [maskedValue, setMaskedValue] = useState<string>(() => {
    const clampValue = clampRawValueByMaskType(maskType, initialValue);
    const maskFn = getMaskFunction(maskType);
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

      newRawValue = clampRawValueByMaskType(maskType, newRawValue);

      const maskFn = getMaskFunction(maskType);
      const newMaskedValue = maskFn(newRawValue);

      setRawValue(newRawValue);
      setMaskedValue(newMaskedValue);
    },
    [getMaskFunction, maskType]
  );

  const setValue = useCallback(
    (newRaw: string) => {
      const clampedRaw = clampRawValueByMaskType(maskType, newRaw);
      const maskFn = getMaskFunction(maskType);
      setRawValue(clampedRaw);
      setMaskedValue(maskFn(clampedRaw));
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
