import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { moderateScale } from 'react-native-size-matters';
import { Ionicons } from 'react-native-vector-icons';
import ExerciseSummary from './ExerciseSummary';
import Attendance from './Attendance';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Home({ navigation }) {

  function NotificationBell({ onPress, hasNotification }) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.badgeContainer}>
        <Ionicons name="notifications-outline" size={moderateScale(24)} color="#ebf0ff" />
        {hasNotification && <View style={styles.badge} />}
      </TouchableOpacity>
    );
  }

  return (
    <LinearGradient
      colors={['#0A0A0A', '#0A0A0A', '#111F45']} // 검은색 → 약한 남색 → 진한 파란색
      locations={[0, 0.85, 1]} // 30%까지 검은색, 이후 점점 파란색
      start={{ x: 0, y: 0 }} // 왼쪽 위에서 시작
      end={{ x: 0, y: 1 }} // 오른쪽 아래로 진행
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={true}
        horizontal={false}
        scrollEnabled={true}
      >
        <View style={styles.header}>
          <View style={{ width: moderateScale(40) }} />
          <Image source={require('../../../assets/images/Home/Liet.png')} style={styles.liet} />
          <NotificationBell hasNotification={true} onPress={() => navigation.navigate('Notifications')} />
        </View>

        <ExerciseSummary />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: moderateScale(30) }}>
          <View style={{ flex: 1, left: moderateScale(-15) }}>
            <TouchableOpacity style={styles.healthAndRunning}>
              <View style={{ paddingLeft: moderateScale(15), paddingTop: moderateScale(10) }}>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: moderateScale(19), marginBottom: moderateScale(5) }}>헬스</Text>
                <Text style={{ color: '#D0D0D0', fontSize: moderateScale(9) }}>근육 성장을 위한 첫 걸음!</Text>
              </View>
              <Image
                source={require('../../../assets/images/Home/dumbbell.png')}
                style={{ width: moderateScale(85.86), height: moderateScale(62.29), alignSelf: 'flex-end', bottom: moderateScale(-10) }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.healthAndRunning} onPress={() => navigation.navigate("HrvMeasurement", { button: '러닝' })}>
              <View style={{ paddingLeft: moderateScale(15), paddingTop: moderateScale(10) }}>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: moderateScale(19), marginBottom: moderateScale(5) }}>러닝</Text>
                <Text style={{ color: '#D0D0D0', fontSize: moderateScale(9) }}>오늘도 활기찬 하루를 시작해볼까요?</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image
                  source={require('../../../assets/images/Home/tree.png')}
                  style={{ width: moderateScale(46), height: moderateScale(56.7), position: 'absolute', right: moderateScale(120), bottom: moderateScale(-6) }}
                />
                <Image
                  source={require('../../../assets/images/Home/rode.png')}
                  style={{ width: moderateScale(187), height: moderateScale(86) }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("StairsGoal")} style={[styles.healthAndRunning, { flex: 1, justifyContent: 'flex-end', width: moderateScale(158), height: moderateScale(246), right: moderateScale(-15) }]}>
            <View style={{ paddingLeft: moderateScale(15), paddingTop: moderateScale(10), top: moderateScale(-2.5) }}>
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: moderateScale(19), marginBottom: moderateScale(5) }}>계단 오르기</Text>
              <Text style={{ color: '#D0D0D0', fontSize: moderateScale(9) }}>계단은 인생의 업힐,{'\n'}정상을 향해 한 걸음 더!</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image
                source={require('../../../assets/images/Home/Union.png')}
                style={{ width: moderateScale(65), height: moderateScale(207.5), flex: 1, flexDirection: 'row', left: moderateScale(-10) }}
              />
              <Image
                source={require('../../../assets/images/Home/63빌딛.png')}
                style={{ width: moderateScale(109), height: moderateScale(174), flex: 1, flexDirection: 'row', alignSelf: 'flex-end' }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Attendance />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: moderateScale(20),
    minHeight: SCREEN_HEIGHT,
  },
  scrollViewContent: {
    paddingBottom: moderateScale(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(82),
    marginBottom: moderateScale(40),
  },
  liet: {
    width: moderateScale(84),
    height: moderateScale(20.78),
    alignSelf: 'center',
  },
  healthAndRunning: {
    width: moderateScale(179),
    height: moderateScale(114),
    backgroundColor: '#181818',
    borderRadius: 3,
    marginBottom: moderateScale(20),
    overflow: 'hidden'
  },
  badgeContainer: {
    padding: moderateScale(6),
  },
  badge: {
    position: 'absolute',
    top: moderateScale(3),
    right: moderateScale(3),
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(4.5),
    backgroundColor: '#507dfa',
  },
});