import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default function Splash2({ navigation }) {
    const handle = () => {
        navigation.replace("Login");
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../../src/assets/images/Splash/splash circle effect.png')} style={{ zIndex: 0, position: "absolute" }} />
            <View style={{ height: moderateScale(192) }} />
            <Image source={require('../../../src/assets/images/Splash/splash screen graph.png')}
                style={{ zIndex: 1, marginBottom: moderateScale(119) }} />
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{ fontWeight: 'semibold', fontSize: moderateScale(30), color: '#e8eaed', marginBottom: moderateScale(29), textAlign: 'center', }}>데이터로 설계하는{'\n'}맞춤형 운동</Text>
                <Text style={{ fontSize: moderateScale(12), color: '#c7c7c7', marginBottom: moderateScale(29), textAlign: 'center', }}>운동 데이터 분석을 통해 당신에게 가장 적합한 루틴을 추천합니다.{'\n'}
                    러닝, 계단 오르기, 헬스까지! 효율적인 운동을 시작해 보세요.</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handle}>
                <Text style={{ fontWeight: 'bold', fontSize: moderateScale(16), color: '#ffffff' }}>계속하기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: moderateScale(342),
        height: moderateScale(52),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#507dfa',
        borderRadius: 10
    }
});