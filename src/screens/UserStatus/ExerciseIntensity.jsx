import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    Animated,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { BlurView } from 'expo-blur';
import Svg, { Circle, Path } from 'react-native-svg';

const options = [
    '오늘 제대로 불태운다🔥🔥',
    '적당히 끌어올려볼까🔥',
    '몸 푸는 느낌으로 가볍게😌',
    '오늘은 자유롭게~ 😎',
];

export default function ExerciseIntensity({ navigation, route }) {
    const { button } = route.params;
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [showPulse, setShowPulse] = useState(false);

    const titleY = useRef(new Animated.Value(0)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const contentOpacity = useRef(new Animated.Value(0)).current;
    const mainOpacity = useRef(new Animated.Value(1)).current;
    const pulseOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        navigation.setOptions({
            headerBackTitle: button
        });
    }, [navigation, button]);

    useEffect(() => {
        titleOpacity.setValue(0);
        titleY.setValue(160);

        const showTitle = setTimeout(() => {
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(titleY, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(() => {
                        setTimeout(() => {
                            Animated.timing(contentOpacity, {
                                toValue: 1,
                                duration: 300,
                                useNativeDriver: true,
                            }).start();
                        }, 500);
                    });
                }, 500);
            });
        }, 1000);

        return () => clearTimeout(showTitle);
    }, []);

    const handleNext = () => {
        Animated.timing(mainOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start(() => {
            setShowPulse(true);
            setTimeout(() => {
                Animated.timing(pulseOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }).start();
            }, 500);
        });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/Exercise/Ellipse 19.png')} style={{ position: 'absolute' }} />

            {!showPulse && (
                <Animated.View style={{ opacity: mainOpacity, flex: 1, width: '100%', alignItems: 'center' }}>
                    <Animated.View
                        style={{
                            opacity: titleOpacity,
                            transform: [{ translateY: titleY }],
                            marginBottom: moderateScale(30),
                            marginTop: moderateScale(80),
                        }}
                    >
                        <Text style={styles.title}>운동 강도 선택하기</Text>
                    </Animated.View>
                    <Animated.View style={{ opacity: contentOpacity, width: '100%', alignItems: 'center' }}>
                        <View style={styles.options}>
                            {options.map((label, idx) => {
                                const selected = selectedIdx === idx;
                                const icon = selected ? (
                                    <Svg width={20} height={20} viewBox="0 0 20 20">
                                        <Circle
                                            cx={10}
                                            cy={10}
                                            r={9}
                                            stroke="#fff"
                                            strokeWidth={2}
                                            fill="none"
                                        />
                                        <Path
                                            d="M6 10.5l3 3 5-5"
                                            stroke="#fff"
                                            strokeWidth={2}
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </Svg>
                                ) : (
                                    <Svg width={20} height={20} viewBox="0 0 20 20">
                                        <Circle
                                            cx={10}
                                            cy={10}
                                            r={9}
                                            stroke="#507dfa"
                                            strokeWidth={2}
                                            fill="none"
                                        />
                                    </Svg>
                                );

                                const OptionContent = (
                                    <TouchableOpacity
                                        key={idx}
                                        activeOpacity={0.8}
                                        style={[
                                            styles.select,
                                            selected ? styles.selectSelected : styles.selectUnselected,
                                        ]}
                                        onPress={() => setSelectedIdx(idx)}
                                    >
                                        <View style={styles.iconWrap}>{icon}</View>
                                        <Text style={[styles.selectText]}>{label}</Text>
                                    </TouchableOpacity>
                                );

                                return selected ? (
                                    <View key={idx}>
                                        {OptionContent}
                                    </View>
                                ) : (
                                    <BlurView
                                        key={idx}
                                        intensity={40}
                                        tint="light"
                                        style={{ borderRadius: 10, overflow: 'hidden' }}
                                    >
                                        {OptionContent}
                                    </BlurView>
                                );
                            })}
                        </View>
                        <View style={styles.bottomButtonWrap}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    selectedIdx === null ? styles.buttonDisabled : styles.buttonEnabled
                                ]}
                                disabled={selectedIdx === null}
                                onPress={handleNext}
                            >
                                <Text style={styles.buttonText}>다음</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </Animated.View>
            )}

            {showPulse && (
                <Animated.View style={{ opacity: pulseOpacity, flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.pulseTitle}>이제 심박수 측정을{'\n'}하러 가볼까요?</Text>
                    </View>
                    <View style={styles.pulseButtonWrap}>
                        <TouchableOpacity style={styles.pulseButtonMain}>
                            <Text style={styles.pulseButtonText}>심박수 측정하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pulseButtonSub}>
                            <Text style={styles.pulseButtonText}>바로 운동하러 가기</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
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
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: moderateScale(24),
    },
    options: {
        width: '100%',
        flexDirection: 'column',
        gap: moderateScale(16),
        alignItems: 'center',
    },
    select: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        borderRadius: 10,
        height: moderateScale(64),
    },
    selectSelected: {
        width: moderateScale(333),
        height: moderateScale(69.82),
        backgroundColor: CHECK_COLOR,
        ...Platform.select({
            ios: {
                shadowColor: CHECK_COLOR,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 25,
            },
            android: {
                elevation: 16,
            },
        }),
    },
    selectUnselected: {
        width: moderateScale(305),
        backgroundColor: 'rgba(255, 255, 255, 0.16)',
        ...Platform.select({
            ios: {
                shadowColor: CHECK_COLOR,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 25,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    iconWrap: {
        marginRight: moderateScale(14),
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectText: {
        fontWeight: '600',
        fontSize: moderateScale(15),
        color: '#fff',
    },
    button: {
        width: moderateScale(305),
        height: moderateScale(52),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(20),
    },
    buttonEnabled: {
        backgroundColor: CHECK_COLOR,
    },
    buttonDisabled: {
        backgroundColor: 'rgba(215, 215, 215, 0.93)',
    },
    bottomButtonWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: moderateScale(-240),
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontWeight: '700',
        fontSize: moderateScale(16),
        color: '#ffffff',
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