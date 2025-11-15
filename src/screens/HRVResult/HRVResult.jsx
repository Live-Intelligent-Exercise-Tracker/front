import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, {useEffect} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {moderateScale} from "react-native-size-matters";
import {useDispatch, useSelector} from "react-redux";
import {getWorkoutRecommend} from "../../redux/slices/workoutSlice";
import {Ionicons} from "@expo/vector-icons";
import {Svg, Polyline} from "react-native-svg";

const {width, height} = Dimensions.get("window");

const HRVResult = () => {
  const {workoutIntensity, workoutRecommend} = useSelector(
    (state) => state.workout
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {/* 배경 */}
      <View style={styles.blackBackground} />
      <LinearGradient
        colors={["#000000", "#1A2852"]}
        style={styles.gradient}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
      />

      <View style={styles.scrollViewContainer}>
        {/* 콘텐츠 */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* <View style={styles.header}>
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text style={styles.title}>러닝</Text>
        </View> */}

          <View style={styles.statusContainer}>
            <View style={styles.statusImageSection}>
              <Image
                source={require("../../assets/images/HRVResult/greenPoop.png")}
              />
            </View>

            <View style={styles.statusTextSection}>
              <Text style={styles.heartRateText}>
                <Text style={{color: "white"}}>심박수 수치가 </Text>
                <Text style={{color: "#00FF6A", fontWeight: "bold", fontSize:moderateScale(26),}}>
                  평균입니다.
                </Text>
              </Text>
              <Text style={styles.subText}>
                사용자의 맞춤형 운동 프로그램을 설계하기 위해 실시간 심박수
                데이터를 수집하고 있습니다
              </Text>
            </View>
          </View>

          <View style={styles.graphBoxContainer}>
            <View style={styles.graphBox}>
              <Image
                source={require("../../assets/images/HRVResult/ResultChart2.png")}
                style={styles.resultChart}
                resizeMode="cover"
              />

              <View style={styles.statsRow}>
                <Text style={styles.statText}>
                  최대{"\n"}
                  <Text style={styles.statNumber}>79 bpm</Text>
                </Text>
                <Text style={styles.statText}>
                  최소{"\n"}
                  <Text style={styles.statNumber}>66 bpm</Text>
                </Text>
                <Text style={styles.statText}>
                  평균{"\n"}
                  <Text style={styles.statNumber}>72 bpm</Text>
                </Text>
              </View>
              {/* </ImageBackground> */}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>현재 상태</Text>
            <Text style={styles.sectionText}>
              현재 측정된 심박수는 가벼운 활동이나 낮은 강도의 운동을 하기
              적합한 상태입니다. 심박수가 급격히 상승하지 않으며, 비교적
              안정적으로 유지되고 있습니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI 운동 프로그램 추천</Text>
            <Text style={styles.sectionText}>
              🔥 운동 강도 추천 “심박수가 천천히 오르는 경향이 있어, 가벼운
              워밍업 운동(스트레칭, 가벼운 걷기 등)으로 시작하는 것이 좋습니다.
              이후 점진적으로 강도를 높이며 본격적인 운동으로 전환하는 것이
              효과적입니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI 운동 프로그램 추천</Text>
            <Text style={styles.sectionText}>
              🔥 운동 강도 추천 “심박수가 천천히 오르는 경향이 있어, 가벼운
              워밍업 운동(스트레칭, 가벼운 걷기 등)으로 시작하는 것이 좋습니다.
              이후 점진적으로 강도를 높이며 본격적인 운동으로 전환하는 것이
              효과적입니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI 운동 프로그램 추천</Text>
            <Text style={styles.sectionText}>
              🔥 운동 강도 추천 “심박수가 천천히 오르는 경향이 있어, 가벼운
              워밍업 운동(스트레칭, 가벼운 걷기 등)으로 시작하는 것이 좋습니다.
              이후 점진적으로 강도를 높이며 본격적인 운동으로 전환하는 것이
              효과적입니다.
            </Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>러닝 하러 가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HRVResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: height * 0.14,
  },
  blackBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: "#000000",
  },
  gradient: {
    position: "absolute",
    top: height * 0.5,
    left: 0,
    right: 0,
    height: height * 0.5,
  },
  scrollViewContainer: {
    // paddingBottom: height * 0.02,
  },
  scrollContent: {
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.03,
    paddingBottom: height * 0.06,
  },
  statusContainer: {
    marginBottom: height * 0.03,
    flexDirection: "row",
  },
  statusImageSection: {
    width: "20%",
    alignItems:"center",
    justifyContent:"center",
  },
  statusTextSection: {
    width: "80%",
    justifyContent:"center",
  },
  heartRateText: {
    fontSize: moderateScale(20),
    marginBottom: height*0.005,
  },
  subText: {
    color: "#626262",
    fontSize: 13,
  },
  graphBoxContainer: {
    paddingHorizontal: width * 0.03,
  },
  graphBox: {
    backgroundColor: "#5C68EF15",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  resultChart: {
    width: "100%",
    height: height * 0.13,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: width * 0.03,
  },
  statText: {
    color: "#aaa",
    fontSize: 13,
    textAlign: "center",
  },
  statNumber: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#4DA6FF",
    fontSize: 15,
    marginBottom: 6,
    fontWeight: "600",
  },
  sectionText: {
    color: "white",
    fontSize: 13,
    lineHeight: 20,
  },
  buttonSection: {
    alignItems: "center",
    // paddingBottom: height * 0.1,
  },
  button: {
    backgroundColor: "#507DFA",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 32,
    width: width * 0.9,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
