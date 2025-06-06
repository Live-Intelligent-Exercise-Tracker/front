import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Chart from './Chart';

const data = [
    { label: '페이스', value: '페이스' },
    { label: '심박수', value: '심박수' },
];

const chartData = {
    페이스: [3, 9, 15, 20, 35, 45, 40, 38, 36],
    심박수: [70, 82, 95, 110, 125, 139, 157, 145, 130],
}

const chartColor = {
    페이스: '#507DFA',
    심박수: '#FF5F5F',
}

const chartSuffix = {
    페이스: 'km',
    심박수: 'bpm',
}

export default function ExerciseChart() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [value, setValue] = useState('페이스');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;
    const textFadeAnim = useRef(new Animated.Value(1)).current;

    const openDropdown = () => {
        setDropdownVisible(true);
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }),
        ]).start();
    };

    const closeDropdown = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.in(Easing.cubic),
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.in(Easing.cubic),
            }),
        ]).start(() => setDropdownVisible(false));
    };

    const handleSelect = (item) => {
        Animated.sequence([
            Animated.timing(textFadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
            Animated.timing(textFadeAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
        ]).start();
        setValue(item.value);
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontSize: moderateScale(44), color: '#ffffff' }}>12.02</Text>
                <Text style={{
                    fontWeight: '500',
                    fontSize: moderateScale(16),
                    color: '#ffffff',
                    marginBottom: moderateScale(6),
                    marginLeft: moderateScale(15),
                }}>
                    km
                </Text>
            </View>

            <View style={{ zIndex: 10 }}>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => dropdownVisible ? closeDropdown() : openDropdown()}
                    activeOpacity={0.7}
                >
                    <Animated.Text style={[styles.selectedTextStyle, { opacity: textFadeAnim }]}>
                        {value}
                    </Animated.Text>
                    <Icon name="keyboard-arrow-down" size={25} color="#dddddd" style={{ marginLeft: 3 }} />
                </TouchableOpacity>

                {dropdownVisible && (
                    <TouchableOpacity
                        style={styles.overlay}
                        activeOpacity={1}
                        onPress={closeDropdown}
                    >
                        <Animated.View
                            style={[
                                styles.dropdownList,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ scale: scaleAnim }],
                                },
                            ]}
                        >
                            {data.map((item, idx) => {
                                let radiusStyle = {};
                                if (item.label === '페이스') {
                                    radiusStyle = {
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0,
                                    };
                                } else if (item.label === '심박수') {
                                    radiusStyle = {
                                        borderTopLeftRadius: 0,
                                        borderTopRightRadius: 0,
                                        borderBottomLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                    };
                                }
                                const isSelected = value === item.value;
                                return (
                                    <TouchableOpacity
                                        key={item.value}
                                        style={[
                                            styles.option,
                                            radiusStyle,
                                            isSelected && styles.selectedOption,
                                        ]}
                                        onPress={() => handleSelect(item)}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={{
                                                color: '#ffffff',
                                                fontSize: moderateScale(13),
                                            }}
                                        >
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </Animated.View>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.viewBox}>
                {value === '페이스' && (
                    <Chart
                        data={chartData['페이스']}
                        color={chartColor['페이스']}
                        suffix={chartSuffix['페이스']}
                    />
                )}
                {value === '심박수' && (
                    <Chart
                        data={chartData['심박수']}
                        color={chartColor['심박수']}
                        suffix={chartSuffix['심박수']}
                    />
                )}
                <View style={{ marginTop: moderateScale(20), flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {[
                        { label: '총 시간', value: '3.2' },
                        { label: '걸음 수', value: '20' },
                        { label: '평균 페이스', value: '5' },
                        { label: '평균 심박수', value: '130' },
                        { label: '소모 칼로리', value: '480' },
                    ]
                        .filter(item => {
                            if (value === '페이스' && item.label === '평균 심박수') return false;
                            if (value === '심박수' && item.label === '평균 페이스') return false;
                            return true;
                        })
                        .map((item, index) => (
                            <View style={styles.itemBox} key={index}>
                                <Text style={{ color: '#A5A5A5', fontWeight: '300', fontSize: moderateScale(9) }}>{item.label}</Text>
                                <Text style={{ color: '#ffffff', fontSize: moderateScale(16) }}>{item.value}</Text>
                            </View>
                        ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'flex-start',
        marginBottom: moderateScale(103.73),
    },
    dropdown: {
        width: moderateScale(93),
        height: moderateScale(28),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.30)',
        opacity: 0.7,
        marginTop: moderateScale(10),
        backgroundColor: 'rgba(255, 255, 255, 0.39)',
        zIndex: 11,
        marginLeft: moderateScale(10),
    },
    selectedTextStyle: {
        fontSize: moderateScale(13),
        color: '#dddddd',
        fontWeight: '500',
        marginLeft: moderateScale(12),
    },
    overlay: {
        position: 'absolute',
        top: moderateScale(40),
        left: moderateScale(10),
        width: moderateScale(93),
    },
    dropdownList: {
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
        zIndex: 999,
    },
    option: {
        paddingVertical: moderateScale(9),
        paddingHorizontal: moderateScale(12),
        backgroundColor: 'lightgray',
    },
    selectedOption: {
        backgroundColor: '#507dfa',
    },
    viewBox: {
        marginTop: moderateScale(10),
        alignSelf: 'flex-start',
    },
    itemBox: {
        paddingHorizontal: moderateScale(25.4),
    },
});