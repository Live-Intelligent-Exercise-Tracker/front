import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { moderateScale } from 'react-native-size-matters';
import RotatingRings from '../../../common/component/RotatingRings';

export default function ExerciseStart({ navigation, route }) {
    const { button, tower } = route.params;
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false); 
    const [timer, setTimer] = useState(0); 
    const intervalRef = useRef(null);

    const bpmStatus = 'stable'; // 임시로 보여주려고 설정한 색 백엔드 연결시 여기에 값만 넣으면 됨
    const bpmColor = finished 
        ? '#161616'
        : bpmStatus === 'stable'
            ? '#34A853'
            : bpmStatus === 'slow'
                ? '#FCB732'
                : bpmStatus === 'rapid'
                    ? '#FF3434'
                    : '#000000';

    useEffect(() => {
        navigation.setOptions({
            headerShown: !started,
            headerTintColor: "#FFFFFF",
            headerBackTitle: !started ? button : '',
            gestureEnabled: !started,
            title: '',
            headerStyle: { backgroundColor: '#161616', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
        });
    }, [navigation, button, started]);

    useEffect(() => {
        if (started) {
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                () => true
            );
            return () => backHandler.remove();
        }
    }, [started]);

    useEffect(() => {
        if (started && !finished) {
            intervalRef.current = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [started, finished]);

    useEffect(() => {
        if (finished && started) {
            clearInterval(intervalRef.current);
        }
    }, [finished, started]);

    const formatTime = (sec) => {
        const h = String(Math.floor(sec / 3600)).padStart(2, '0');
        const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const handleButtonPress = () => {
        if (!started) {
            setStarted(true);
        } else if (!finished) {
            setFinished(true);
        } else {
            if (button == "계단 오르기") {
                navigation.navigate('StairsEnd', { tower: tower });
            } else {
                navigation.navigate('ExerciseEndAll', { button: button }); 
            }
        }
    };

    const buttonBgColor = !started
        ? '#507dfa'
        : !finished
            ? '#ffffff'
            : '#507dfa';

    const buttonTextColor = !started
        ? '#ffffff'
        : !finished
            ? '#161616'
            : '#ffffff';

    const buttonText = !started ? '시작' : '운동 완료';

    const marginTopValue = started ? moderateScale(125) : moderateScale(40);

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: moderateScale(8),
                alignSelf: 'flex-start',
                marginTop: marginTopValue
            }}>
                <Text style={{ fontWeight: 'medium', fontSize: moderateScale(32), color: bpmColor }}>81</Text>
                <Text style={{ fontWeight: 'medium', fontSize: moderateScale(16), color: bpmColor }}>BPM</Text>
            </View>
            <View style={{ marginTop: moderateScale(106), marginBottom: moderateScale(56) }}>
                <RotatingRings HrvSpeed='stable' />
            </View>
            <View>
                <Text style={{ color: '#ffffff', fontSize: moderateScale(53) }}>
                    {formatTime(timer)}
                </Text>
            </View>

            <View style={{ marginTop: moderateScale(109), marginBottom: moderateScale(80) }}>
                <TouchableOpacity
                    style={{
                        width: moderateScale(286),
                        height: moderateScale(52),
                        borderRadius: 20,
                        backgroundColor: buttonBgColor,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={handleButtonPress}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: moderateScale(18), color: buttonTextColor }}>
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161616',
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(20),
    },
});
