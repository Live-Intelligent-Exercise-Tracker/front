import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: '페이스', value: '페이스' },
    { label: '심박수', value: '심박수' },
];

export default function ExerciseChart() {
    const [value, setValue] = useState('페이스');

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontSize: moderateScale(44), color: '#ffffff' }}>12.02</Text>
                <Text style={{
                    fontWeight: 'medium',
                    fontSize: moderateScale(16),
                    color: '#ffffff',
                    marginBottom: moderateScale(6),
                    marginLeft: moderateScale(15),
                }}>
                    km
                </Text>
            </View>
            <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                labelField="label"
                valueField="value"
                value={value}
                onChange={item => {
                    setValue(item.value);
                }}
            />
            <View style={styles.viewBox}>
                {value === '페이스' &&
                    <View style={{ backgroundColor: '#ffffff' }}> 
                        <Text>차트부분 </Text>
                    </View>
                }
                {value === '심박수' &&
                    <View style={{ backgroundColor: '#ffffff' }}>
                        <Text>심박수부분 </Text>
                    </View>
                }
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
                                <Text style={{ color: '#A5A5A5', fontWeight: 'light', fontSize: moderateScale(9) }}>{item.label}</Text>
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
        marginBottom: moderateScale(139)
    },
    dropdown: {
        width: moderateScale(100),
        height: moderateScale(70),
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
    },
    selectedTextStyle: {
        fontSize: moderateScale(17),
        color: '#ffffff',
        fontWeight: 'medium',
    },
    viewBox: {
        marginTop: moderateScale(10),
        alignSelf: 'flex-start',
    },
    itemBox: {
        paddingHorizontal: moderateScale(24),
    }
});