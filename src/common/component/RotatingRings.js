import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

export default function RotatingRings() {
  // 3개의 원 각각의 흔들림 중심값 정의
  const shakes = Array.from({ length: 3 }, () => ({
    x: useRef(new Animated.Value(0)).current,
    y: useRef(new Animated.Value(0)).current,
  }));

  // 각각의 중심을 무작위로 움직이게 함
  useEffect(() => {
    shakes.forEach(({ x, y }) => {
      const animate = () => {
        const offsetX = (Math.random() - 0.5) * 15; // -7.5 ~ +7.5
        const offsetY = (Math.random() - 0.5) * 15;
        const duration = 900 + Math.random() * 600;

        Animated.parallel([
          Animated.timing(x, {
            toValue: offsetX,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(y, {
            toValue: offsetY,
            duration,
            useNativeDriver: true,
          }),
        ]).start(() => animate());
      };
      animate();
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* 중앙 이미지 */}
      <Image
        source={require('../../assets/images/Loading/gradient_ring.png')}
        style={styles.ringImage}
        resizeMode="contain"
      />

      {/* 3개의 이동하는 원 */}
      <Animated.View style={[styles.svgLayer, {
        transform: [{ translateX: shakes[0].x }, { translateY: shakes[0].y }]
      }]}>
        <Svg width={224} height={224} viewBox="0 0 224 224">
          <Rect x="43.5" y="43.5" width="138" height="134" rx="67" stroke="white" strokeOpacity={0.3} strokeWidth={1.6} fill="none" />
        </Svg>
      </Animated.View>

      <Animated.View style={[styles.svgLayer, {
        transform: [{ translateX: shakes[1].x }, { translateY: shakes[1].y }]
      }]}>
        <Svg width={224} height={224} viewBox="0 0 224 224">
          <Rect x="46.5" y="47.5" width="131" height="128" rx="64" stroke="white" strokeOpacity={0.3} strokeWidth={1.6} fill="none" />
        </Svg>
      </Animated.View>

      <Animated.View style={[styles.svgLayer, {
        transform: [{ translateX: shakes[2].x }, { translateY: shakes[2].y }]
      }]}>
        <Svg width={224} height={224} viewBox="0 0 224 224">
          <Rect x="41.5" y="48.5" width="132" height="124" rx="62" stroke="white" strokeOpacity={0.3} strokeWidth={1.6} fill="none" />
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 224,
    height: 224,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  ringImage: {
    position: 'absolute',
    width: 224,
    height: 224,
  },
  svgLayer: {
    position: 'absolute',
    width: 224,
    height: 224,
  },
});
