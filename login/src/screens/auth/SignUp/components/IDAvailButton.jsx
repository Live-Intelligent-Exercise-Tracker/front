import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";

const IDAvailButton = ({IDAvailCheck}) => {
  return (
    <TouchableOpacity style={styles.IDAvailButton} onPress={IDAvailCheck}>
      <Text style={styles.ButtonText}>중복 확인</Text>
    </TouchableOpacity>
  );
};

export default IDAvailButton;

const styles = StyleSheet.create({
  IDAvailButton: {
    backgroundColor: "#507DFA",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: moderateScale(35),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    marginLeft:moderateScale(6),
    borderRadius: 6,
  },
  ButtonText:{
    color:"white"
  }
});
