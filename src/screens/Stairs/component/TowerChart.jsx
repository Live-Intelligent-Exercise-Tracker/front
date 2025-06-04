import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const towerData = [
    {
        key: '남산 타워',
        stair: '68',
        image: require('../../../assets/images/StairsGoal/남산타워 1.png'),
    },
    {
        key: '포스코 타워',
        stair: '68',
        image: require('../../../assets/images/StairsGoal/포스코타워.png'),
    },
    {
        key: '엘시티',
        stair: '101',
        image: require('../../../assets/images/StairsGoal/엘시티 1.png'),
    },
    {
        key: '롯데 타워',
        stair: '123',
        image: require('../../../assets/images/StairsGoal/롯데타워 3.png'),
    },
];

export default function TowerChart({ onAnimationEnd }) {
    const Tower = towerData.find(tower => tower.key === '포스코 타워');

    const recordData = [
        { label: '총 시간', value: '01:12:03' },
        { label: '계단 수', value: '2072' },
        { label: '칼로리', value: '777' },
        { label: '평균 심박수', value: '127 bpm' },
    ];

    const towerOpacity = useRef(new Animated.Value(0)).current;
    const towerFont = useRef(new Animated.Value(30)).current;
    const towerY = useRef(new Animated.Value(100)).current;

    const rowOpacity = useRef(new Animated.Value(0)).current;
    const rowY = useRef(new Animated.Value(130)).current;

    const goalOpacity = useRef(new Animated.Value(0)).current;

    const allY = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(towerOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setTimeout(() => {
                    Animated.parallel([
                        Animated.timing(rowOpacity, {
                            toValue: 1,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(rowY, {
                            toValue: 0,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                        Animated.timing(towerFont, {
                            toValue: 22,
                            duration: 600,
                            useNativeDriver: false,
                        }),
                        Animated.timing(towerY, {
                            toValue: 0,
                            duration: 600,
                            useNativeDriver: true,
                        }),
                    ]).start(() => {
                        setTimeout(() => {
                            Animated.timing(goalOpacity, {
                                toValue: 1,
                                duration: 400,
                                useNativeDriver: true,
                            }).start(() => {
                                setTimeout(() => {
                                    Animated.timing(allY, {
                                        toValue: 0,
                                        duration: 500,
                                        useNativeDriver: true,
                                    }).start(() => {
                                        if (onAnimationEnd) onAnimationEnd();
                                    });
                                }, 1500);
                            });
                        }, 1000);
                    });
                }, 500);
            });
        }, 1000);
    }, []);

    return (
        <Animated.View style={{
            alignItems: 'center', justifyContent: 'center', flex: 1,
            transform: [{ translateY: allY }],
        }}>
            <Animated.View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: towerOpacity,
                    transform: [{ translateY: towerY }],
                }}
            >
                <Image source={Tower.image} />
                <Animated.Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: towerFont.interpolate({
                            inputRange: [22, 30],
                            outputRange: [moderateScale(22), moderateScale(30)],
                        }),
                        color: '#ffffff',
                        marginTop: moderateScale(13),
                    }}
                >
                    {Tower.key}
                </Animated.Text>
            </Animated.View>
            <Animated.View
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    opacity: rowOpacity,
                    transform: [{ translateY: rowY }],
                    marginTop: moderateScale(10),
                }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: moderateScale(43), color: '#ffffff' }}>
                    57/
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: moderateScale(37), color: '#ffffff', marginRight: moderateScale(3) }}>
                    {Tower.stair}
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: moderateScale(26), color: '#ffffff', marginBottom: moderateScale(8) }}>
                    층
                </Text>
            </Animated.View>

            <Animated.View style={{ opacity: goalOpacity, }}>
                <Animated.View
                    style={{
                        marginTop: moderateScale(40),
                        marginBottom: moderateScale(5),
                        marginLeft: moderateScale(8),
                        width: '100%',
                        alignItems: 'flex-start',
                    }}
                >
                    <View style={{ flexDirection: 'row', gap: moderateScale(8), alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: moderateScale(18), color: '#e6e6e6' }}>
                            목표 달성률
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: moderateScale(20), color: '#507dfa' }}>
                            83.82%
                        </Text>
                    </View>
                </Animated.View>

                <Animated.View
                    style={{
                        marginBottom: moderateScale(47),
                    }}
                >
                    <View style={styles.recordGrid}>
                        <View style={styles.recordRow}>
                            <RecordBox label={recordData[0].label} value={recordData[0].value} />
                            <RecordBox label={recordData[1].label} value={recordData[1].value} />
                        </View>
                        <View style={styles.recordRow}>
                            <RecordBox label={recordData[2].label} value={recordData[2].value} />
                            <RecordBox label={recordData[3].label} value={recordData[3].value} />
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );
}

function RecordBox({ label, value }) {
    return (
        <View style={styles.recordBox}>
            <Text style={styles.recordLabel}>{label}</Text>
            <Text style={styles.recordValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    recordGrid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(10),
    },
    recordBox: {
        width: moderateScale(144),
        height: moderateScale(55),
        borderRadius: 4,
        backgroundColor: 'rgba(80, 125, 250, 0.22)',
        padding: moderateScale(10),
        marginHorizontal: moderateScale(6),
        justifyContent: 'center',
    },
    recordLabel: {
        fontWeight: 'bold',
        fontSize: moderateScale(9),
        color: '#c4c4c4',
    },
    recordValue: {
        fontWeight: 'bold',
        fontSize: moderateScale(14),
        color: '#ffffff',
    },
});


