import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale } from 'react-native-size-matters'
import useHRVListener from '../../utils/hooks/useHRVListener';

const {width, height} = Dimensions.get('window');

const Workout = () => {
    const hrv = useHRVListener();

    const [toggleWorkout,setToggleWorkout] = useState(false)

    const handleWorkoutButton = ()=>{
        setToggleWorkout(prev=>!prev)
    }

  return (
    <View style={styles.container}>
      {/* {toggleWorkout===false&&
        <TouchableOpacity style={styles.startButton} onPress={handleWorkoutButton}>
            <Text style={styles.startText}>시작</Text>
        </TouchableOpacity>
      }
      {toggleWorkout===true&&
        <TouchableOpacity style={styles.stopButton} onPress={handleWorkoutButton}>
            <Text style={styles.stopText}>중단</Text>
        </TouchableOpacity>
      } */}

    <Text style={styles.HRVText}>
        {hrv !== null ? `${hrv} ms` : '측정 중...'}
    </Text>
      
      
    </View>
  )
}

export default Workout

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center',
    },
    startButton:{
        paddingHorizontal: width*0.3,
        paddingVertical: moderateScale(10),
        backgroundColor: '#507DFA',
        borderRadius: moderateScale(15),
    },
    stopButton:{
        paddingHorizontal: width*0.3,
        paddingVertical: moderateScale(10),
        backgroundColor: 'white',
        borderRadius: moderateScale(15),
    },
    startText:{
        color:"white",
        fontSize: moderateScale(12),
    },
    stopText:{
        color:"black",
        fontSize:moderateScale(12),
    },
    HRVText:{
        fontSize:moderateScale(20),
        color:"white",
    }
})