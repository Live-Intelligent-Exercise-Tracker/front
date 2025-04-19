import {Dimensions, StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import {moderateScale} from "react-native-size-matters";

const {width,height}= Dimensions.get('window');

const PasswordRow = ({type, pass, verifPass, handleInputChange, checkEmptyField,  errors, placeholder}) => {

  return (
    <View style={styles.signupRow}>
      <Text style={styles.rowTitle}>{type=="pass"&&"비밀번호"}</Text>

        <View style={styles.signupBox}>
            <TextInput
            onChangeText={(text)=>handleInputChange("pass",text)}
            onBlur={()=>checkEmptyField("pass",pass)}
            style={[styles.signupInput,errors?.pass&&styles.errorInput]}
            secureTextEntry={type==="pass"?true:false}
            placeholder={placeholder}
            placeholderTextColor="#CED3DE"
            />
        </View>
        {errors.pass?<Text style={styles.errorText}>{errors?.pass}</Text>:""}

        <TextInput
          onChangeText={(text)=>handleInputChange("verifPass",text)}
          onBlur={()=>checkEmptyField("verifPass",verifPass)}
          style={[styles.signupInput, styles.passInputMargin, errors?.verifPass&&styles.errorInput]}
          secureTextEntry={type==="pass"?true:false}
          placeholder="비밀번호를 다시 입력해 주세요."
          placeholderTextColor="#CED3DE"
        />
        {errors.verifPass?<Text style={styles.errorText}>{errors?.verifPass}</Text>:""}        
    </View>
  );
};

export default PasswordRow;

const styles = StyleSheet.create({
  signupRow: {
    marginBottom: moderateScale(15),
  },
  rowTitle: {
    fontSize: moderateScale(14),
    marginBottom: moderateScale(8),
  },
  signupBox:{
    flexDirection:"row",
    alignItems:"center",
  },
  signupInput: {
    borderWidth: 1,
    borderColor: "#CED3DE",
    borderRadius: 10,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(16),
    width: width*0.9,
    marginBottom: moderateScale(8),
  },
  errorInput:{
    borderColor:'red',
  },
  smallInput:{
    width: width*0.45,
    paddingVertical:moderateScale(10),
    marginRight: width*0.02,
    textAlign:"center",
  },
  errorText:{
    color:'red',
    fontSize:moderateScale(11),
    marginBottom:moderateScale(6),
  },
});
