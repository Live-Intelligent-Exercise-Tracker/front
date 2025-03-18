import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated, Modal } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Checkbox from "expo-checkbox";

export default function Agree({ navigation }) {
    const [isChecked, setIsChecked] = useState({
        all: false,
        age: false,
        terms: false,
        privacy: false,
        marketing: false,
        notification: false
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");

    // 개별 체크박스 상태 변경 함수
    const toggleCheckbox = (key) => {
        setIsChecked((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // 전체 동의 체크박스
    const toggleAll = () => {
        const newValue = !isChecked.all;
        setIsChecked({
            all: newValue,
            age: newValue,
            terms: newValue,
            privacy: newValue,
            marketing: newValue,
            notification: newValue
        });
    };

    const isAllRequiredChecked = isChecked.age && isChecked.terms && isChecked.privacy;

    const animatedValue = useRef(new Animated.Value(isAllRequiredChecked ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isAllRequiredChecked ? 1 : 0, // 1이면 활성화 색상, 0이면 비활성화 색상
            duration: 300, // 0.3초 동안 변화
            useNativeDriver: false,
        }).start();
    }, [isAllRequiredChecked]);

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["#B3B3B3", "#507DFA"], // 회색 → 파란색
    });

    const openModal = (content) => {
        setModalContent(content);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { marginBottom: moderateScale(20) }]}>약관동의</Text>
            <View style={styles.clauses}>
                <Checkbox value={isChecked.all} onValueChange={toggleAll} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14) }]}>전체 동의</Text>
            </View>
            <View style={{ height: moderateScale(0.5), backgroundColor: "#B3B3B3", marginBottom: moderateScale(20) }} />
            <View style={styles.clauses}>
                <Checkbox value={isChecked.age} onValueChange={() => toggleCheckbox("age")} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14), fontWeight: 'normal' }]}>만 14세 이상입니다.</Text>
                <Text style={styles.essential}>(필수)</Text>
            </View>
            <View style={styles.clauses}>
                <Checkbox value={isChecked.terms} onValueChange={() => toggleCheckbox("terms")} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14), fontWeight: 'normal' }]}>이용약관 동의</Text>
                <Text style={styles.essential}>(필수)</Text>
                <TouchableOpacity onPress={() => openModal("이용약관 내용입니다.")} style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.termLook}>약관보기</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.clauses}>
                <Checkbox value={isChecked.privacy} onValueChange={() => toggleCheckbox("privacy")} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14), fontWeight: 'normal' }]}>개인정보 수집 및 이용 동의</Text>
                <Text style={styles.essential}>(필수)</Text>
                <TouchableOpacity onPress={() => openModal("개인정보 수집 및 이용 동의 내용입니다.")} style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.termLook}>약관보기</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.clauses}>
                <Checkbox value={isChecked.marketing} onValueChange={() => toggleCheckbox("marketing")} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14), fontWeight: 'normal' }]}>개인정보 마케팅 활용 동의</Text>
                <Text style={[styles.essential, { color: '#B3B3B3' }]}>(선택)</Text>
            </View>
            <View style={styles.clauses}>
                <Checkbox value={isChecked.notification} onValueChange={() => toggleCheckbox("notification")} style={styles.checkbox} />
                <Text style={[styles.text, { fontSize: moderateScale(14), fontWeight: 'normal' }]}>이벤트 알림 메일 및 SMS 등 수신</Text>
                <Text style={[styles.essential, { color: '#B3B3B3' }]}>(선택)</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', flex: 1, }}>
                <Animated.View style={{ backgroundColor, borderRadius: 10, }}>
                    <TouchableOpacity style={{
                        height: moderateScale(49.74),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        disabled={!isAllRequiredChecked}
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={{ fontSize: moderateScale(16), color: '#FFFFFF', fontWeight: 'bold' }}>다음</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            {/* 🔹 모달 추가 */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalContent}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                            <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#FFFFFF",
        padding: moderateScale(20),
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: moderateScale(14),
        marginBottom: moderateScale(20),
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#507DFA",
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        borderRadius: 5,
    }
});