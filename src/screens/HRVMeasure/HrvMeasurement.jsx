import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient'
import { useState, useEffect } from 'react';

export default function HrvMeasurement({ navigation, route }) {
    const { button } = route.params;
    const [dots, setDots] = useState('');
    const [timeoutId, setTimeoutId] = useState(null); // 타이머 상태 관리

    useEffect(() => {
        // 버튼에 따라 headerBackTitle 설정
        navigation.setOptions({
            headerBackTitle: button // '러닝' 또는 '계단 오르기'로 설정
        });
    }, [navigation, button]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + '.' : '')); // 점 개수 0~3개 반복
        }, 500); // 0.5초마다 업데이트

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);

    // 타이머를 실행하고 상태로 저장하는 함수
    const startTimer = () => {
        const id = setTimeout(() => {
            navigation.navigate('HrvResult', { button: button }); // 이동할 페이지 이름
        }, 5000); // 5초 후 실행

        setTimeoutId(id); // 타이머 id 저장
    };

    // 화면이 포커스될 때마다 타이머 재시작
    useEffect(() => {
        // focus 시 타이머 시작
        const onFocus = navigation.addListener('focus', () => {
            startTimer(); // 타이머 시작
        });

        // blur 시 타이머 초기화
        const onBlur = navigation.addListener('blur', () => {
            if (timeoutId) {
                clearTimeout(timeoutId); // 기존 타이머 정리
            }
        });

        // clean up listeners
        return () => {
            onFocus();
            onBlur();
        };
    }, [navigation, timeoutId]);

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                alignSelf: 'flex-start',
            }}>
                <Text style={styles.bpm}>70</Text>
                <Text style={[styles.bpm, { fontSize: moderateScale(16) }]}>BPM</Text>
            </View>
            <View style={{ paddingTop: moderateScale(150) }}>
                <View style={styles.chartContainer}>
                    <Text style={{ color: "#ffffff" }}>심박수 차트 부분</Text>
                </View>
                <View style={{
                    width: moderateScale(339),
                    height: moderateScale(116),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={styles.hrvText}>HRV 측정 중
                        <Text style={styles.hrvText}>{dots}</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0A',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: moderateScale(20)
    },
    bpm: {
        fontSize: moderateScale(32),
        fontWeight: 'medium',
        color: '#507DFA',
        marginHorizontal: moderateScale(2.5)
    },
    chartContainer: {
        height: moderateScale(196),
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',

        borderRadius: moderateScale(12),
        padding: moderateScale(10),

        shadowColor: '#507DFA',  // 은은한 파란색 그림자
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 3,
        shadowRadius: 100,

        // 🔹 Android 그림자 설정
        elevation: 15, // 높을수록 그림자 강해짐
    },
    hrvText: {
        fontWeight: 'semibold',
        fontSize: moderateScale(26),
        color: '#FFFFFF'
    }
});