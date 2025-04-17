import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";

const IDAvailButton = ({IDAvailCheck, type, checkedStatus}) => {
  return (
    <>
    {type==="email"&&
      <TouchableOpacity 
        style={[styles.IDAvailButton,checkedStatus.emailChecked&&styles.disabledButton]} 
        onPress={()=>IDAvailCheck(type)}
        disabled={checkedStatus.emailChecked}
      >
        <Text style={styles.ButtonText}>중복 확인</Text>
      </TouchableOpacity>
    }
    {type==="nick"&&
      <TouchableOpacity 
        style={[styles.IDAvailButton,checkedStatus.nickChecked&&styles.disabledButton]} 
        onPress={()=>IDAvailCheck(type)}
        disabled={checkedStatus.nickChecked}
      >
        <Text style={styles.ButtonText}>중복 확인</Text>
      </TouchableOpacity>

    }
    
    </>
  );
};

export default IDAvailButton;

const styles = StyleSheet.create({
  IDAvailButton: {
    backgroundColor: "#01B99F",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(10),
    marginLeft:moderateScale(6),
    borderRadius: 6,
  },
  disabledButton:{
    backgroundColor:"#CED3DE"
  },
  ButtonText:{
    color:"white"
  }
});
