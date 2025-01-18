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
npm install react-native-web-mask
```

### YARN

```bash
yarn add react-native-web-mask
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

### useInputMask({ maskType, initialValue, customMask })

| Prop         | Type                      | Description                                   |
| ------------ | ------------------------- | --------------------------------------------- |
| maskType     | phone                     | money                                         |
| initialValue | string                    | Optional initial value.                       |
| customMask   | (value: string) => string | Custom mask function if maskType is 'custom'. |

### Returns

| Prop         | Type                      | Description                                   |
| ------------ | ------------------------- | --------------------------------------------- |
| maskType     | phone                     | money                                         |
| initialValue | string                    | Optional initial value.                       |
| customMask   | (value: string) => string | Custom mask function if maskType is 'custom'. |

## 📄 License

MIT License. Gone head and use/contribute as much as you like!

## ✨ Contributions

Pull requests and suggestions are welcome! Please open an issue if you find a bug or want to contribute. Thank youuu!
