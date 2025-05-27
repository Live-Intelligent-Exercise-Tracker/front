import {Dimensions, StatusBar, StyleSheet, Text, View} from "react-native";
import React from "react";
import {moderateScale} from "react-native-size-matters";
import {useVideoPlayer, VideoView} from "expo-video";

const {width, height} = Dimensions.get("window");

const HRVMeasure = () => {
  // const videoSource='../../../assets/videos/HRVMeasure/HRMonitor.mp4'
  const videoSource = require("../../assets/videos/HRVMeasure/HRMonitor2.mp4");
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <VideoView
          style={styles.video}
          player={player}
          nativeControls={false}
        />
      </View>
      <StatusBar style="light-content" />
    </View>
  );
};

export default HRVMeasure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#0A0A0A',
    alignItems: "center",
    justifyContent: "flex-start",
    // padding: moderateScale(20)
  },
  videoContainer: {},
  video: {
    width: width,
    height: 250,
  },
});
