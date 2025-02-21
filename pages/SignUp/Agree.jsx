import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Checkbox from "expo-checkbox";

export default function Agree({ navigation }) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { marginBottom: moderateScale(20) }]}>약관동의</Text>
            <View style={styles.clauses}>
                <Checkbox value={isChecked} onValueChange={setIsChecked} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14) }]}>전체 동의</Text>
            </View>
            <View style={{ height: moderateScale(0.5), backgroundColor: "#B3B3B3", marginBottom: moderateScale(20) }} />
            <View style={styles.clauses}>
                <Checkbox value={isChecked} onValueChange={setIsChecked} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14), fontWeight: 'normal' }]}>만 14세 이상입니다.</Text>
                <Text style={styles.essential}>(필수)</Text>
            </View>
            <View style={styles.clauses}>
                <Checkbox value={isChecked} onValueChange={setIsChecked} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14), fontWeight: 'normal' }]}>이용약관 동의</Text>
                <Text style={styles.essential}>(필수)</Text>
                <View style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.termLook}>약관보기</Text>
                </View>
            </View>
            <View style={styles.clauses}>
                <Checkbox value={isChecked} onValueChange={setIsChecked} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14), fontWeight: 'normal' }]}>개인정보 수집 및 이용 동의</Text>
                <Text style={styles.essential}>(필수)</Text>
                <View style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.termLook}>약관보기</Text>
                </View>
            </View>
            <View style={styles.clauses}>
                <Checkbox value={isChecked} onValueChange={setIsChecked} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14), fontWeight: 'normal' }]}>개인정보 마케팅 활용 동의</Text>
                <Text style={[styles.essential, { color: '#B3B3B3' }]}>(선택)</Text>
            </View>
            <View style={styles.clauses}>
                <Checkbox value={isChecked} onValueChange={setIsChecked} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14), fontWeight: 'normal' }]}>이벤트 알림 메일 및 SMS 등 수신</Text>
                <Text style={[styles.essential, { color: '#B3B3B3' }]}>(선택)</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', flex: 1, }}>
                <TouchableOpacity style={{ borderRadius: 10, backgroundColor: '#B3B3B3', height: moderateScale(49.74), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: moderateScale(16), color: '#FFFFFF', fontWeight: 'bold' }}>다음</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
// 트러블 슈팅 체크박스?
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616',
        padding: moderateScale(20)
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: moderateScale(16),
    },
    checkbox: {
        width: moderateScale(24),
        height: moderateScale(24),
        borderColor: '#FFFFFF',
        marginRight: moderateScale(10)
    },
    clauses: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: moderateScale(20)
    },
    essential: {
        color: '#0085FF',
        fontSize: moderateScale(8),
        marginLeft: moderateScale(10)
    },
    termLook: {
        fontWeight: 'bold',
        color: '#B3B3B3',
        fontSize: moderateScale(8),
    }
});