import { View, Text, TextInput, StyleSheet } from "react-native";

import { Colors } from "../util/Colors";
function CustomInput({
  label,
  keyboardType,
  secure,
  onChangeText,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text
        style={styles.label}
        //   style={[styles.label, isInvalid && styles.labelInvalid]}
      >
        {label}
      </Text>
      <TextInput
        // style={[styles.input, isInvalid && styles.inputInvalid]}
        style={styles.input}
        // autoCapitalize={false}
        // autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: Colors.primary500,
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
