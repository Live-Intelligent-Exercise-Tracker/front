import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default function HrvBefore({ navigation, route }) {
    const { button, tower } = route.params;
    const pulseOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: button
        });

        Animated.timing(pulseOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [navigation, button]);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/Exercise/Ellipse 19.png')} style={{ position: 'absolute' }} />

            <Animated.View style={{ opacity: pulseOpacity, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.pulseTitle}>이제 심박수 측정을{'\n'}하러 가볼까요?</Text>
                </View>
                <View style={styles.pulseButtonWrap}>
                    <TouchableOpacity style={styles.pulseButtonMain} onPress={() => navigation.navigate("HrvMeasurement", { button: button, tower: tower })}>
                        <Text style={styles.pulseButtonText}>심박수 측정하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pulseButtonSub} onPress={() => navigation.navigate("ExerciseStart", { button: button, tower: tower })}>
                        <Text style={styles.pulseButtonText}>바로 운동하러 가기</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}

const CHECK_COLOR = '#507dfa';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: moderateScale(20),
        backgroundColor: '#111111',
    },
    pulseTitle: {
        color: '#ffffff',
        fontSize: moderateScale(26),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: moderateScale(30),
    },
    pulseButtonWrap: {
        width: '100%',
        position: 'absolute',
        bottom: moderateScale(40),
        alignItems: 'center',
    },
    pulseButtonMain: {
        width: moderateScale(305),
        height: moderateScale(52),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CHECK_COLOR,
        marginBottom: moderateScale(18),
    },
    pulseButtonSub: {
        width: moderateScale(305),
        height: moderateScale(52),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(215, 215, 215, 0.93)',
    },
    pulseButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: moderateScale(16),
    },
});