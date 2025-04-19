import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {moderateScale} from "react-native-size-matters";
import IDAvailButton from "./IDAvailButton";

const {width,height}= Dimensions.get('window');

const SignupRow = ({type, data, handleInputChange, checkEmptyField, IDAvailCheck, checkedStatus, errors, placeholder}) => {

  return (
    <View style={styles.signupRow}>
      <Text style={styles.rowTitle}>
        {type==="email"&&"이메일"}
        {type==="nick"&&"닉네임"}
      </Text>
      <View style={styles.signupBox}>
        <TextInput
          onChangeText={(text)=>handleInputChange(type,text)}
          onBlur={()=>checkEmptyField(type,data)}
          style={[
            styles.signupInput,
            type==="nick"&&errors?.nick&&styles.errorInput,
            type==="email"&&errors?.email&&styles.errorInput,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#CED3DE"
        />
        {type==="email"||type==="nick"?
        <IDAvailButton IDAvailCheck={IDAvailCheck} type={type} checkedStatus={checkedStatus}/>
        :""}
      </View>
      {type==="email"&&errors?.email?<Text style={styles.errorText}>{errors?.email}</Text>:""}
      {type==="nick"&&errors?.nick?<Text style={styles.errorText}>{errors?.nick}</Text>:""}
    </View>
  );
};

export default SignupRow;

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
    flex:1,
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
