import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";

const IntensityButton = ({isSelected, option, index, setIntensity}) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setIntensity(option.value);
        setSelectedIndex(index);
      }}
      activeOpacity={0.8}
      style={[
        styles.button,
        isSelected && styles.selectedButton,
        isSelected && {transform: [{scale: 1.3}]},
      ]}
    >
      <Text style={[styles.buttonText, isSelected && styles.selectedText]}>
        {option.label}
      </Text>
    </TouchableOpacity>
  );
};

export default IntensityButton;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  button: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
});
