import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GenderRow = () => {
  return (
    <View style={styles.signupRow}>
        <Text>성별</Text>
        <View style={styles.genderContainer}>
            <TouchableOpacity
            style={[
                styles.genderButton,
                formData.gender === 'MALE' && styles.genderSelected,
            ]}
            onPress={() => handleChange('gender', 'MALE')}
            >
            <Text>남성</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[
                styles.genderButton,
                formData.gender === 'FEMALE' && styles.genderSelected,
            ]}
            onPress={() => handleChange('gender', 'FEMALE')}
            >
            <Text>여성</Text>
            </TouchableOpacity>
        </View>
    </View>
    
  )
}

export default GenderRow

const styles = StyleSheet.create({
    signupRow:{
        marginBottom: moderateScale(10),
    },
    genderContainer:{
        flexDirection:"row",
        justifyContent:"space-around"
    }
})