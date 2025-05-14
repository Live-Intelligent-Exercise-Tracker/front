import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { moderateScale } from 'react-native-size-matters';
import { useState, useRef } from 'react';
import ExerciseSummary from './ExerciseSummary';
import Attendance from './Attendance';
import Header from './Header'
import ExerciseButton from './ExerciseButton';

const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef();

  const titles = ['🏃‍♂️런닝(유산소 운동)', '🧗계단 오르기', '🏋️헬스'];

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  return (
    <LinearGradient
      colors={['#070707', '#111f45']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <Header />

        <Text style={{ fontSize: moderateScale(24), fontWeight: 'bold', color: '#ffffff', alignSelf: 'flex-start', marginTop: moderateScale(20) }}>
          지난 주 운동 요약
        </Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollRef}
          style={{ width }}
        >
          {titles.map((title, index) => (
            <View key={index} style={{ width, alignItems: 'center' }}>
              <ExerciseSummary title={title} />
            </View>
          ))}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {titles.map((_, i) => (
            <View
              key={i}
              style={[
                styles.indicator,
                { opacity: i === activeIndex ? 1 : 0.3 },
              ]}
            />
          ))}
        </View>

        <Text style={{ fontSize: moderateScale(24), fontWeight: 'bold', color: '#ffffff', alignSelf: 'flex-start', marginTop: moderateScale(30) }}>
          운동 하러 가기
        </Text>
        <ExerciseButton navigation={navigation} />

        <Attendance />

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  indicator: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
});