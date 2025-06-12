import {
  Animated,
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {moderateScale} from "react-native-size-matters";
import {useVideoPlayer, VideoView} from "expo-video";
import {LinearGradient} from "expo-linear-gradient";

const {width, height} = Dimensions.get("window");

const DURATION = 3000; // 60초

const HRVMeasure = ({navigation}) => {
  const videoSource = require("../../assets/videos/HRVMeasure/HRMonitor3.mp4");
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const progress = useRef(new Animated.Value(0)).current;
  // console.log("progress 초기값:", progress);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    console.log("애니메이션 시작됨");
    Animated.timing(progress, {
      toValue: 1,
      duration: DURATION,
      useNativeDriver: false,
    }).start(() => {
      console.log("애니메이션 완료됨");
      // navigation.navigate("HRVResult",{ button: "심박수 측정" })
      navigation.replace("HRVResult");
    });

    // return () => clearInterval(interval);
    const listenerId = progress.addListener(({value}) => {
      // console.log("현재 애니메이션 값:", value);
      setPercent(Math.floor(value * 100));
    });

    return () => {
      progress.removeListener(listenerId);
    };
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    // outputRange: [0, width * 0.8],
  });

  return (
    <View style={styles.container}>
      <View style={styles.blackBackground} />

      <LinearGradient
        colors={["#000000", "#1A2852"]}
        style={styles.gradient}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
      />

      <View style={styles.contentContainer}>
        <View style={styles.bpmContainer}>
          <Text style={styles.bpmNumber}>81</Text>
          <Text style={styles.bpmText}>BPM</Text>
        </View>

        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={player}
            nativeControls={false}
          />
        </View>

        <Text style={styles.progressTitle}>실시간 심박수 측정을 바탕으로</Text>
        <Text style={styles.progressTitle}>
          사용자의 상태 분석을 진행중입니다
        </Text>

        {/* 로딩바 */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[styles.progressBar, {width: widthInterpolated}]}
          />
        </View>

        {/* 퍼센트 텍스트 */}
        <Text style={styles.percentText}>{percent}%</Text>
        <StatusBar style="light-content" />
      </View>
    </View>

    // </ImageBackground>
  );
};

export default HRVMeasure;

const styles = StyleSheet.create({
  // background: {
  //   flex: 1,
  //   width: "100%",
  //   height: "100%",
  // },
  container: {
    flex: 1,
  },
  blackBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.7,
    backgroundColor: "#000000",
  },
  gradient: {
    position: "absolute",
    top: height * 0.7,
    left: 0,
    right: 0,
    height: height * 0.3,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(35),
  },
  bpmContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "flex-end",
  },
  bpmText: {
    color: "#507DFA",
    fontSize: moderateScale(16),
    letterSpacing: 1,
    paddingBottom: moderateScale(3),
  },
  bpmNumber: {
    color: "#507DFA",
    fontSize: moderateScale(24),
    letterSpacing: 1,
    marginRight: moderateScale(5),
  },
  videoContainer: {
    marginTop: moderateScale(80),
    marginBottom: moderateScale(20),
  },
  video: {
    width: width,
    height: 250,
  },
  progressTitle: {
    fontSize: moderateScale(15),
    color: "white",
    letterSpacing: moderateScale(2),
    marginBottom: moderateScale(5),
  },
  progressBarContainer: {
    width: "100%",
    height: moderateScale(5),
    borderRadius: 10,
    // borderWidth: 0.5,
    borderColor: "#fff",
    backgroundColor: "#444444",
    overflow: "hidden",
    marginTop: moderateScale(25),
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#507DFA",
  },
  percentText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#507DFA",
  },
});

// import React, {useEffect, useState} from "react";
// import {
//   Dimensions,
//   StatusBar,
//   StyleSheet,
//   View,
//   ActivityIndicator,
//   ImageBackground,
// } from "react-native";
// import {useVideoPlayer, VideoView} from "expo-video";
// import {Asset} from "expo-asset";

// const {width} = Dimensions.get("window");

// const HRVMeasure = () => {
//   const [videoUri, setVideoUri] = useState(null);

//   useEffect(() => {
//     const loadVideo = async () => {
//       const asset = Asset.fromModule(
//         require("../../assets/videos/HRVMeasure/HRMonitor3.mp4")
//       );
//       await asset.downloadAsync();
//       setVideoUri(asset.localUri);
//     };

//     loadVideo();
//   }, []);

//   const player = useVideoPlayer(videoUri ?? undefined, (player) => {
//     player.loop = true;
//     player.play();
//   });

//   if (!videoUri) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#888" />
//       </View>
//     );
//   }

//   return (
//     <ImageBackground
//       source={require("../../assets/images/HRVMeasure/HRVbg.png")}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.container}>
//         <View style={styles.videoContainer}>
//           <VideoView
//             style={styles.video}
//             player={player}
//             nativeControls={false}
//           />
//         </View>

//       </View>
//       <StatusBar style="light-content" />
//     </ImageBackground>
//   );
// };

// export default HRVMeasure;

// const styles = StyleSheet.create({
//   background:{
//     flex:1,
//     width:"100%",
//     height:"100%",
//   },
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   videoContainer: {},
//   video: {
//     width: width,
//     height: 250,
//     marginBottom: 300,
//   },
// });
