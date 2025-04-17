import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";

const {width, height} = Dimensions.get('window');

const SignupButton = ({isFormValid, page, handleSignupButton}) => {
  return (
    <TouchableOpacity
    style={[styles.signupButton, !isFormValid && styles.disabledButton]}
    disabled={!isFormValid}
    onPress={handleSignupButton}
    >
      <Text style={styles.signupButtonText}>{page===1?"다음":"가입하기"}</Text>
    </TouchableOpacity>
  );
};

export default SignupButton;

const styles = StyleSheet.create({
  signupButton: {
    backgroundColor: "#01B99F",
    justifyContent: "center",
    alignItems: "center",
    width:width*0.9,
    marginBottom: moderateScale(35),
    paddingVertical: moderateScale(15),
    borderRadius: 6,
  },
  disabledButton:{
    backgroundColor:"#CED3DE"
  },
  signupButtonText:{
    color:"white",    
    textAlign:"center",
    fontSize: moderateScale(16),
  }
});
