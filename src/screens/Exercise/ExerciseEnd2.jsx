import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    ScrollView,
    Image
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';
import ExerciseChart from './ExerciseChart';

const character = {
    green: require('../../assets/images/Exercise/초록이 캐릭터.png'),
    blue: require('../../assets/images/Exercise/파랑이 캐릭터.png'),
    yellow: require('../../assets/images/Exercise/노랑이 캐릭터.png'),
    red: require('../../assets/images/Exercise/빨강이 캐릭터.png'),
}

export default function ExerciseEnd2({ navigation, route }) {
    const slideAnim = useRef(new Animated.Value(100)).current; 
    const slideOpacity = useRef(new Animated.Value(0)).current;

    // const { button } = route.params;

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerBackTitle: button
    //     });
    // }, [navigation, button]);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <LinearGradient
            colors={['#111111', '#161616', '#192C62']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <ExerciseChart />
                <Animated.View style={[styles.feedback, { opacity: slideOpacity, transform: [{ translateY: slideAnim }] }]}>
                    <Text style={{
                        fontSize: moderateScale(27),
                        fontWeight: '600',
                        color: '#ffffff',
                        marginBottom: moderateScale(45)
                    }}>오늘의 운동 피드백</Text>
                    <Image source={character.blue} />
                    <Text style={{
                        fontSize: moderateScale(28),
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: moderateScale(45)
                    }}>70점</Text>
                    <Text style={{
                        fontSize: moderateScale(15),
                        fontWeight: '500',
                        color: '#ffffff'
                    }}>
                        이용 방법이 직관적이라 누구나 쉽게 사용할 수 있어요.
                    </Text>
                </Animated.View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(20),
        paddingBottom: moderateScale(50)
    },
    feedback: {
        width: moderateScale(334),
        height: moderateScale(401),
        borderRadius: 15,
        backgroundColor: 'rgba(244, 244, 244, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(30),
    }
}); 