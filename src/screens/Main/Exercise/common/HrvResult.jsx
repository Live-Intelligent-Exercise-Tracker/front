import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { moderateScale } from 'react-native-size-matters';
import Chart from './Chart';
import RunButton from '../../../../component/RunButton';

export default function HrvResult({ navigation, route }) {
    const { button } = route.params;

    useEffect(() => {
        // 버튼에 따라 headerBackTitle 설정
        navigation.setOptions({
            headerBackTitle: button // '러닝' 또는 '계단 오르기'로 설정
        });
    }, [navigation, button]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>ㅇㅇㅇ님의{'\n'}<Text style={[styles.text, { color: '#507DFA' }]}>현재 상태</Text>입니다.</Text>
            <View style={{ height: moderateScale(2.5), backgroundColor: "#507DFA", marginTop: moderateScale(20), marginBottom: moderateScale(30) }} />
            <Text style={[
                styles.text,
                { fontSize: moderateScale(18) }
            ]}>
                상태: <Text style={[
                    styles.text,
                    { fontSize: moderateScale(20), color: '#34A853' }
                ]}>편안
                </Text>
            </Text>
            <Chart />
            <View style={{ justifyContent: 'center', alignSelf: 'center', width: '75%' }}>
                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' }}>
                    가벼운 워밍업이나 낮은 강도의 운동으로 시작하면 좋습니다.
                </Text>
            </View>
            <RunButton button={button} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0A',
        padding: moderateScale(20)
    },
    text: {
        fontWeight: 'bold',
        fontSize: moderateScale(25),
        color: '#FFFFFF',
    }
}); 