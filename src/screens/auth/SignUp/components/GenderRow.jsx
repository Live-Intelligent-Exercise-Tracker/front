import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'

const {width,height}= Dimensions.get('window');

const GenderRow = ({data,handleBioInput,bioErrors}) => {
  return (
    <View style={styles.signupRow}>
        <Text style={styles.rowTitle}>성별</Text>
        <View style={styles.genderContainer}>
            <TouchableOpacity
            style={[
                styles.genderButton,
                bioErrors?.gender&&styles.errorInput,
                data === 'MALE' && styles.genderSelected,
            ]}
            onPress={() => handleBioInput('gender', 'MALE')}
            >
            <Text style={[styles.genderText,data==="MALE" && styles.selectedText]}>남성</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[
                styles.genderButton,
                bioErrors?.gender&&styles.errorInput,
                data === 'FEMALE' && styles.genderSelected,
            ]}
            onPress={() => handleBioInput('gender', 'FEMALE')}
            >
            <Text style={[styles.genderText,data==="FEMALE" && styles.selectedText]}>여성</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>{bioErrors?.gender}</Text>
    </View>
    
  )
}

export default GenderRow

const styles = StyleSheet.create({
    signupRow:{
        marginBottom: moderateScale(3),
    },
    rowTitle:{
        fontSize: moderateScale(14),
        marginBottom: moderateScale(8),
    },
    genderContainer:{
        flexDirection:"row",
    },
    genderButton: {
        paddingVertical: moderateScale(14),
        paddingHorizontal: moderateScale(26),
        marginRight: moderateScale(9),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    genderSelected: {
        backgroundColor:"#5ac0b3",
        borderWidth: 0,
    },
    genderText:{

    },
    selectedText:{
        color: "white",
    },
    errorInput:{
        borderColor:'red',
    },
    errorText:{
        color:"red",
        fontSize:moderateScale(11),
        height: height*0.02,
        marginTop:moderateScale(2),
    } 
})