import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {moderateScale} from "react-native-size-matters";
import IDAvailButton from "./IDAvailButton";

const {width,height}= Dimensions.get('window');

const SignupRow = ({type, data, setData, validateField, IDAvailCheck, errors, placeholder}) => {
  const handleSignupInput = (event) => {
    setData(event.nativeEvent.text);
  };

  return (
    <View style={styles.signupRow}>
      <Text style={styles.rowTitle}>{type}</Text>
      <View style={styles.signupBox}>
        <TextInput
          onChange={handleSignupInput}
          onBlur={()=>validateField((type==="아이디"&&"id")||(type==="닉네임"&&"nick")||(type==="이메일"&&"email"),data)}
          style={[
            styles.signupInput,
            type==="아이디"&&errors?.id&&styles.errorInput,
            type==="닉네임"&&errors?.nick&&styles.errorInput,
            type==="이메일"&&errors?.email&&styles.errorInput,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#CED3DE"
        />
        {type==="아이디"?
        <IDAvailButton IDAvailCheck={IDAvailCheck}/>
        :""}
      </View>
      {type==="아이디"&&errors?.id?<Text style={styles.errorText}>{errors?.id}</Text>:""}
      {type==="닉네임"&&errors?.nick?<Text style={styles.errorText}>{errors?.nick}</Text>:""}
      {type==="이메일"&&errors?.email?<Text style={styles.errorText}>{errors?.email}</Text>:""}
    </View>
  );
};

export default SignupRow;

const styles = StyleSheet.create({
  signupRow: {
    marginBottom: moderateScale(10),
  },
  rowTitle: {
    fontSize: moderateScale(14),
    marginBottom: moderateScale(2),
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
    paddingVertical: moderateScale(12),
    flex:1,
    marginVertical: moderateScale(6),
  },
  errorInput:{
    borderColor:'red',
  },
  smallInput:{
    width: width*0.45,
    paddingVertical:moderateScale(6),
    marginRight: width*0.02,
    textAlign:"center",
    flex:0,
  },
  errorText:{
    color:'red',
    fontSize:moderateScale(11),
    marginBottom:moderateScale(6),
  },
});
