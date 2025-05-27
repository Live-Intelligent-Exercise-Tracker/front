import {
  Animated,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useRef, useState} from "react";
import {moderateScale} from "react-native-size-matters";
import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

const WorkoutIntesity = ({navigation}) => {
  const options = [
    {label: "오늘 제대로 불태운다🔥🔥", value: "very hard"},
    {label: "적당히 끌어올려볼까🔥", value: "hard"},
    {label: "몸 푸는 느낌으로 가볍게😌", value: "medium"},
    {label: "오늘은 자유롭게~ 😎", value: "easy"},
  ];

  const [intensity, setIntensity] = useState(null);
  const animationRefs = useRef(
    options.map(() => new Animated.Value(1))
  ).current;

  const handleRadioButton = (index, value) => {
    setIntensity(value);

    animationRefs.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i === index ? 1.15 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNext = () => {
    console.log(navigation)
    navigation.navigate("HrvMeasurement", { button: '헬스' }); //{button:'헬스'}를 추가하면 navigate할 때 오류 뜸
  };

  return (
    <ImageBackground
      source={require("../../assets/images/WorkoutIntensity/intensity-background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.wrapper}>
          <Text style={styles.titleText}>운동 강도 선택하기</Text>
          <View style={styles.radioContainer}>
            {options.map((option, index) => {
              const isSelected = intensity === option.value;

              return (
                <Animated.View
                  key={index}
                  style={{
                    transform: [{scale: animationRefs[index]}],
                    opacity: intensity === null ? 1 : (isSelected ? 1 : 0.5),
                  }}
                >
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleRadioButton(index, option.value)}
                    activeOpacity={0.8}
                    style={[
                      styles.button,
                      isSelected && styles.selectedButton,
                      isSelected && styles.glowEffect,
                    //   isSelected && {transform: [{scale: 1.15}]},
                    ]}
                  >
                    {isSelected === true ? (
                      <Image
                        source={require("../../assets/images/WorkoutIntensity/done-check-circle.png")}
                        style={styles.circleImage}
                      />
                    ) : (
                      <Image
                        source={require("../../assets/images/WorkoutIntensity/check-circle2.png")}
                        style={styles.circleImage}
                      />
                    )}
                    <Text
                      style={[
                        styles.buttonText,
                        isSelected && styles.selectedText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          <TouchableOpacity
            style={[
              styles.nextButton,
              intensity ? styles.nextButtonActive : styles.nextButtonInactive,
            ]}
            onPress={handleNext}
            disabled={!intensity}
          >
            <Text style={styles.nextButtonText}>
              {intensity ? "심박수 측정하러 가기" : "다음"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WorkoutIntesity;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(-130),
  },
  titleText: {
    fontSize: moderateScale(21),
    color: "white",
    fontWeight: "bold",
    letterSpacing: moderateScale(1),
  },
  radioContainer: {
    padding: 20,
    gap: moderateScale(14),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF29",
    width: width * 0.75,
    paddingVertical: moderateScale(20),
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: "#507DFA",
  },
  glowEffect: {
  shadowColor: '#507DFA', // 파란 빛
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.6,
  shadowRadius: 10,
  elevation: 15, // Android용 그림자
},
  circleImage: {
    width: moderateScale(12),
    height: moderateScale(12),
    marginRight: moderateScale(9),
  },
  buttonText: {
    fontSize: moderateScale(14),
    color: "white",
    letterSpacing: moderateScale(1),
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
  nextButton: {
    position: "absolute",
    bottom: moderateScale(70),
    width: width * 0.8,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonInactive: {
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  nextButtonActive: {
    backgroundColor: "#507DFA",
    opacity: 1,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
