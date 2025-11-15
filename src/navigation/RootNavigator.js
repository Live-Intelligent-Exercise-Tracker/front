import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login/Login";
import Terms from "../screens/auth/SignUp/Terms";
import SignUp from "../screens/auth/SignUp/SignUp";
import StairsGoal from "../screens/Stairs/StairsGoal";
import HrvMeasurement from "../screens/HRVMeasure/HrvMeasurement";
import HRVResult from "../screens/HRVResult/HRVResult";
import { View, ActivityIndicator } from "react-native";
import MainTabNavigator from "./MainTabNavigator";
import WorkoutIntesity from "../screens/WorkoutIntensity/WorkoutIntesity";
import HRVMeasure from "../screens/HRVMeasure/HRVMeasure";

const Stack = createStackNavigator();

const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export default function RootNavigator() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    // dispatch(loginWithToken())
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {/* <Stack.Navigator initialRouteName={!user ? "Login" : "MainTabNavigator"}> */}
      <Stack.Navigator initialRouteName={"HRVResult"}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Terms" component={Terms} options={{
          title: "약관 동의",
          headerStyle: { backgroundColor: '#161616', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#FFFFFF",
          headerBackTitle: ''
        }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{
          title: "",
          headerStyle: { backgroundColor: '#FFFFFF', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#000000",
          headerBackTitle: '',
        }} />
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="WorkoutIntensity" component={WorkoutIntesity} options={{
          title: "",
          headerStyle: { backgroundColor: '#0A0A0A', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#FFFFFF",
          headerBackTitle: '홈'
        }} />
        <Stack.Screen name="HRVMeasure" component={HRVMeasure} options={{
          title: "",
          headerStyle: { backgroundColor: '#000000', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#FFFFFF",
          headerBackTitle: '강도'
        }} />
        {/* <Stack.Screen name="HrvMeasurement" component={HrvMeasurement} options={{
          title: "",
          headerStyle: { backgroundColor: '#0A0A0A', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#FFFFFF",
          headerBackTitle: ''
        }} /> */}
        <Stack.Screen name="HRVResult" component={HRVResult} options={{
          title: "",
          headerStyle: { backgroundColor: '#0A0A0A', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#FFFFFF",
          headerBackTitle: ''
        }} />
        <Stack.Screen name="StairsGoal" component={StairsGoal} options={{
          title: "목표를 설정해봐요!",
          headerTintColor: "#FFFFFF",
          headerStyle: { backgroundColor: '#0A0A0A', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerBackTitle: ''
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

