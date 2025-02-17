import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function Main({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={['#000022', '#000000', '#0000AA']} // 검은색 → 약한 남색 → 진한 파란색
        locations={[0, 0.8, 1]} // 30%까지 검은색, 이후 점점 파란색
        start={{ x: 1, y: 0 }} // 왼쪽 위에서 시작
        end={{ x: 0, y: 1 }} // 오른쪽 아래로 진행
        style={styles.container}
      >
        <Image
          source={require('../../assets/Liet.png')}
          style={styles.liet}
        />
        <View style={styles.advertisement}>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <View style={{ flex: 1, left: moderateScale(-15) }}>
            <TouchableOpacity style={styles.healthAndRunning}>
              <View style={{ paddingLeft: moderateScale(15), paddingTop: moderateScale(10) }}>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: moderateScale(18), marginBottom: moderateScale(5) }}>헬스</Text>
                <Text style={{ color: '#D0D0D0', fontSize: moderateScale(8) }}>근육 성장을 위한 첫 걸음!</Text>
              </View>
              <Image
                source={require('../../assets/dumbbell.png')}
                style={{ width: moderateScale(65.86), height: moderateScale(42.29), alignSelf: 'flex-end', bottom: moderateScale(-20) }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.healthAndRunning}>
              <View style={{ paddingLeft: moderateScale(15), paddingTop: moderateScale(10) }}>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: moderateScale(18), marginBottom: moderateScale(5) }}>러닝</Text>
                <Text style={{ color: '#D0D0D0', fontSize: moderateScale(8) }}>오늘도 활기찬 하루를 시작해볼까요?</Text>
              </View>
              <Image
                source={require('../../assets/rode.png')}
                style={{ width: moderateScale(187), height: moderateScale(86) }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.healthAndRunning, { flex: 1, justifyContent: 'flex-end', width: moderateScale(158), height: moderateScale(246), right: moderateScale(-15) }]}>
            <View style={{ paddingLeft: moderateScale(15), paddingTop: moderateScale(10), top: moderateScale(-62.5) }}>
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: moderateScale(18), marginBottom: moderateScale(5) }}>계단 오르기</Text>
              <Text style={{ color: '#D0D0D0', fontSize: moderateScale(8) }}>계단은 인생의 업힐,{'\n'}정상을 향해 한 걸음 더!</Text>
            </View>
            <Image
              source={require('../../assets/63Building.png')}
              style={{ width: moderateScale(64), height: moderateScale(129), alignSelf: 'flex-end' }}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(20)
  },
  liet: {
    width: moderateScale(90.52),  // 아이콘 크기 조절
    height: moderateScale(25.14),
    alignSelf: 'flex-start',
    marginBottom: moderateScale(20)
  },
  advertisement: {
    width: moderateScale(360),
    height: moderateScale(192),
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    marginBottom: moderateScale(20)
  },
  healthAndRunning: {
    width: moderateScale(179),
    height: moderateScale(114),
    backgroundColor: '#181818',
    borderRadius: 3,
    marginBottom: moderateScale(20),
    overflow: 'hidden'
  }
});