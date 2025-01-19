# react-native-web-mask

A **cross-platform** React and React Native hook for handling masked input fields with built-in masks for **phone numbers**, **dates**, **money**, **credit cards**, **ZIP codes**, and more. It also supports **custom masks** for complete flexibility.

---

## ✨ Features

- Supports **React** (Web) and **React Native**.

- Built-in masks: **phone**, **money**, **credit card**, **ZIP code**, **date** (`MM/DD/YYYY`), and **month/day** (`MM/DD`).

- Easy-to-use **custom mask** support.

- Automatically limits raw input length for applicable masks.

- Fully written in **TypeScript** with types included.

- Every helper and type that I used to build this package, I expose! Feel free to use fully tested utilities, helpers and more!

---

## 📦 Installation

### NPM

```bash

npm  install  react-native-web-mask

```

### YARN

```bash

yarn  add  react-native-web-mask

```

---

### 🚀 Usage

## React Web Example

```tsx
import React from "react";

import { useInputMask } from "react-native-web-mask";

function PhoneInput() {
  const { maskedValue, rawValue, onChange } = useInputMask({
    maskType: "phone",
  });

  return (
    <div>
      <label>Phone Number:</label>

      <input
        type="text"
        value={maskedValue}
        onChange={onChange}
        placeholder="(123) 456-7890"
      />

      <p>Raw Value: {rawValue}</p>
    </div>
  );
}

export default PhoneInput;
```

## React Native Example

```tsx
import React from "react";

import { View, TextInput, Text, StyleSheet } from "react-native";

import { useInputMask } from "react-native-web-mask";

export default function PhoneInput() {
  const { maskedValue, rawValue, onChangeText } = useInputMask({
    maskType: "phone",
  });

  return (
    <View style={styles.container}>
      <Text>Phone Number:</Text>

      <TextInput
        style={styles.input}
        value={maskedValue}
        onChangeText={onChangeText}
        placeholder="(123) 456-7890"
        keyboardType="phone-pad"
      />

      <Text>Raw Value: {rawValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },

  input: {
    borderWidth: 1,

    borderColor: "#ccc",

    padding: 8,

    borderRadius: 4,

    marginTop: 8,
  },
});
```

## Custom mask Example

```tsx
import React from "react";

import { useInputMask } from "react-native-web-mask";

function CustomMaskInput() {
  const customMask = (value: string) => value.toUpperCase().slice(0, 6);

  const { maskedValue, rawValue, onChange } = useInputMask({
    maskType: "custom",

    customMask,
  });

  return (
    <div>
      <label>Custom Code:</label>

      <input
        type="text"
        value={maskedValue}
        onChange={onChange}
        placeholder="ABC123"
      />

      <p>Raw Value: {rawValue}</p>
    </div>
  );
}

export default CustomMaskInput;
```

## API Reference

### useInputMask({ maskType, initialValue, customMask } )

| Prop         | Type                      | Description                                                   |
| ------------ | ------------------------- | ------------------------------------------------------------- |
| maskType     | MaskType                  | "phone", "money", "card", "zip", "date", "monthDay", "custom" |
| initialValue | string                    | Optional initial value.                                       |
| customMask   | (value: string) => string | Custom mask function if maskType is 'custom'.                 |

### Returns

| Prop         | Type                                       | Description                      |
| ------------ | ------------------------------------------ | -------------------------------- |
| maskedValue  | string                                     | The returned masked string       |
| rawValue     | string                                     | The users input string value     |
| onChange     | (e: ChangeEvent<HTMLInputElement>) => void | Callback for web inputs          |
| onChangeText | (text:string)=>void                        | Callback for React Native Inputs |

## 🛠️ Mask Utilities

### A utility is a function that performs an opinionated mask.

### `maskDate`

- **Description**: Formats a value as a date in the format MM/DD/YYYY.

- **Signature**: `maskDate(value: string): string`

- **Example**: `maskDate("12345678") // => "01/23/4567"

### `maskMoney`

- **Description**: Formats a value as a decimal number in the format 0.00.

- **Signature**: `maskMoney(value: string): string`

- **Example**: `maskMoney("123456") // => "1,234.56"

### `maskPhone`

- **Description**: Formats a value as a phone number in the format (###) ###-####.

- **Signature**: `maskPhone(value: string): string`

- **Example**: `maskPhone("1234567890") // => "(123) 456-7890"

### `maskMonthDay`

- **Description**: Formats a value as a month/day in the format MM/DD.

- **Signature**: `maskMonthDay(value: string): string`

- **Example**: `maskMonthDay("1231") // => "12/31"

### `maskCard`

- **Description**: Formats a value as a credit card number in the format XXXX XXXX XXXX XXXX.

- **Signature**: `maskCard(value: string): string`

- **Example**: `maskCard("1234567890123456") // => "1234 5678 9012 3456"

### `maskZip`

- **Description**: Formats a value as a zip code in the format 12345-6789.

- **Signature**: `maskZip(value: string): string`

- **Example**: `maskZip("123456789") // => "12345-6789"

## 🛠️ Mask Helper

### A mask helper is a function that's used to build a mask utility! They are common string manipulations that can be used for various masks

### `insertChunks`

- **Description**: Inserts a separator (e.g., '/') between chunks of specified sizes.

- **Signature**: `insertChunks(value: string, chunkSizes: number[], separator: string): string`

- **Example**: `insertChunks("12345", [2, 2, 1], "/") // => "12/34/5"

### `stripNonDigits`

- **Description**: Strips all non-digit characters from a string.

- **Signature**: `stripNonDigits(value: string): string`

### `clampDigits`

- **Description**: Clamps a numeric string (after parsing to a number) within a min and max range.

- **Signature**: `clampDigits(numericString: string, min: number, max: number): string`

- **Example**: `clampDigits("13", 1, 12) // => "12"

### `applyRegexReplace`

- **Description**: A flexible RegExp replace helper.

- **Signature**: `applyRegexReplace(value: string, pattern: RegExp, replaceWith: string): string`

- **Example**: `applyRegexReplace("12345", /\d/g, "\*") // => "**\***"

### `limitLength`

- **Description**: Ensures the string doesn't exceed a certain length.

- **Signature**: `limitLength(value: string, maxLength: number): string`

### `parseCurrencyToNumber`

- **Description**: Extracts the decimal equivalent from a currency string.

- **Signature**: `parseCurrencyToNumber(currency: string): number`

## 📄 License

MIT License. Gone head and use/contribute as much as you like!

## ✨ Contributions

Pull requests and suggestions are welcome! Please open an issue if you find a bug or want to contribute. Thank youuu!
