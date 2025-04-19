import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {moderateScale} from "react-native-size-matters";

const {width,height}= Dimensions.get('window');

const InfoRow = ({type, data, setData, validateField, errors, placeholder}) => {
  const handleSignupInput = (event) => {
    setData(event.nativeEvent.text);
  };

  return (
    <View style={styles.signupRow}>
      <Text style={styles.rowTitle}>{type}</Text>
      <View style={styles.signupBox}>
        <TextInput
          value={data}
          onChange={handleSignupInput}
          onBlur={()=>validateField((type==="나이"&&"age")||(type==="키"&&"height")||(type==="몸무게"&&"weight"),data)}
          style={[
            styles.signupInput,
            type==="나이"&&errors?.age&&styles.errorInput,
            type==="키"&&errors?.height&&styles.errorInput,
            type==="몸무게"&&errors?.weight&&styles.errorInput,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#CED3DE"
          keyboardType={type==="나이"||type=="키"||type=="몸무게"?"number-pad":""}
        />
        <Text>
          {type==="나이"?"세":""}
          {type==="키"?"cm":""}
          {type==="몸무게"?"kg":""}
        </Text>
      </View>
      {/* {type==="아이디"&&errors?.id?<Text style={styles.errorText}>{errors?.id}</Text>:""}
      {type==="닉네임"&&errors?.nick?<Text style={styles.errorText}>{errors?.nick}</Text>:""} */}
      {type==="나이"&&errors?.age?<Text style={styles.errorText}>{errors?.age}</Text>:""}
      {type==="키"&&errors?.height?<Text style={styles.errorText}>{errors?.height}</Text>:""}
      {type==="몸무게"&&errors?.weight?<Text style={styles.errorText}>{errors?.weight}</Text>:""}
    </View>
  );
};

export default InfoRow;

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
    width: width*0.3,
    borderWidth: 1,
    borderColor: "#CED3DE",
    borderRadius: 10,
    paddingHorizontal: moderateScale(14),
    paddingVertical:moderateScale(10),
    marginVertical: moderateScale(6),
    marginRight: width*0.02,
    
  },
  errorInput:{
    borderColor:'red',
  },
  errorText:{
    color:'red',
    fontSize:moderateScale(11),
    marginBottom:moderateScale(6),
  },
});
