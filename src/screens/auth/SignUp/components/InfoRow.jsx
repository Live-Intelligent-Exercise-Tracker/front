import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {moderateScale} from "react-native-size-matters";

const {width,height}= Dimensions.get('window');

const InfoRow = ({type, data, handleBioInput, checkEmptyBioField, bioErrors, placeholder}) => {

  return (
    <View style={styles.signupRow}>
      <Text style={styles.rowTitle}>
        {type==="age"&&"나이"}
        {type==="height"&&"키"}
        {type==="weight"&&"몸무게"}
      </Text>
      <View style={styles.signupBox}>
        <TextInput
          value={data}
          onChangeText={(text)=>handleBioInput(type,text)}
          onBlur={()=>checkEmptyBioField(type,data)}
          style={[
            styles.signupInput,
            type==="age"&&bioErrors?.age&&styles.errorInput,
            type==="height"&&bioErrors?.height&&styles.errorInput,
            type==="weight"&&bioErrors?.weight&&styles.errorInput,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#CED3DE"
          keyboardType={type==="age"||type=="height"||type=="weight"?"number-pad":""}
        />
        <Text>
          {type==="age"?"세":""}
          {type==="height"?"cm":""}
          {type==="weight"?"kg":""}
        </Text>
      </View>
      <Text style={styles.errorText}>
        {type==="age"&&bioErrors?.age}
        {type==="height"&&bioErrors?.height}
        {type==="weight"&&bioErrors?.weight}
      </Text>
    </View>
  );
};

export default InfoRow;

const styles = StyleSheet.create({
  signupRow: {
    marginBottom: moderateScale(3),
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
    width: width*0.4,
    borderWidth: 1,
    borderColor: "#CED3DE",
    borderRadius: 10,
    paddingHorizontal: moderateScale(14),
    paddingVertical:moderateScale(14),
    marginRight: width*0.02,
    
  },
  errorInput:{
    borderColor:'red',
  },
  errorText:{
    color:'red',
    fontSize:moderateScale(11),
    height: height*0.02,
    marginTop: moderateScale(2),
    marginBottom:moderateScale(6),
  },
});
