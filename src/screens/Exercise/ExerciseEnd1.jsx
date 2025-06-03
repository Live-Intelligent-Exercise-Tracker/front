import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExerciseEnd1({ navigation }) {
    const handleMove = () => {
        navigation.navigate('ExerciseEnd2');
    };

    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleDimOpacity = useRef(new Animated.Value(1)).current;
    const titleTranslateY = useRef(new Animated.Value(50)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleTranslateY = useRef(new Animated.Value(150)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.parallel([
                        Animated.timing(titleDimOpacity, {
                            toValue: 0.2,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(titleTranslateY, {
                            toValue: -70,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(subtitleOpacity, {
                            toValue: 1,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(subtitleTranslateY, {
                            toValue: 0,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(buttonOpacity, {
                            toValue: 1,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                    ]).start();
                }, 1000);
            });
        }, 500);
    }, []);

    return (
        <LinearGradient
            colors={['#111111', '#161616', '#192C62']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <View style={{ height: moderateScale(310) }} />

            <View style={{ alignItems: 'center', marginBottom: moderateScale(250) }}>
                <Animated.View
                    style={{
                        opacity: Animated.multiply(titleOpacity, titleDimOpacity),
                        transform: [{ translateY: titleTranslateY }],
                        position: 'absolute',
                        alignItems: 'center',
                        width: '100%',
                        zIndex: 2,
                    }}
                >
                    <Text style={styles.text}>러닝 완료 👏</Text>
                </Animated.View>

                <Animated.View
                    style={{
                        opacity: subtitleOpacity,
                        transform: [{ translateY: subtitleTranslateY }],
                    }}
                >
                    <Text style={[styles.text, { textAlign: 'center' }]}>
                        오늘의 기록을{'\n'}확인 해볼까요?
                    </Text>
                </Animated.View>
            </View>

            <Animated.View style={{ opacity: buttonOpacity }}>
                <TouchableOpacity style={styles.button} onPress={handleMove}>
                    <Text style={styles.buttonText}>운동 기록 확인하기</Text>
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(20),
    },
    text: {
        fontWeight: 'bold',
        fontSize: moderateScale(33),
        color: '#ffffff',
    },
    button: {
        width: moderateScale(342),
        height: moderateScale(52),
        backgroundColor: '#507dfa',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: moderateScale(16),
        color: '#ffffff',
    },
});
