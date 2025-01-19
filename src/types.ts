import { ChangeEvent } from "react";

export type MaskType =
  | "phone"
  | "money"
  | "card"
  | "zip"
  | "date"
  | "monthDay"
  | "custom";

export interface UseInputMaskProps {
  maskType?: MaskType;
  initialValue?: string;
  customMask?: (value: string) => string;
}

export interface UseInputMaskReturn {
  maskedValue: string;
  rawValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeText: (text: string) => void;
  setValue: (value: string) => void;
}

export type MaskFn = (value: string) => string;
