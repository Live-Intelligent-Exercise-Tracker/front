import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { moderateScale } from 'react-native-size-matters';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from 'react-native-vector-icons';
import Login from "../pages/Login/Login";
import Agree from "../pages/SignUp/Agree";
import Main from "../pages/Main/Main";
import My from "../pages/Main/My";
import Group from "../pages/Main/Group";
import SignUp from "../pages/SignUp/SignUp";
import StairsTarget from "../pages/Main/Exercise/Stairs/StairsTarget";
import HrvMeasurement from "../pages/Main/Exercise/common/HrvMeasurement";
import HrvResult from "../pages/Main/Exercise/common/HrvResult";
import { View, ActivityIndicator } from "react-native";
import { loginWithToken } from "../slices/userSlice";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//asdf
function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
      }}>
      <Tab.Screen
        name="My"
        component={My}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person-outline" size={moderateScale(24)} color={focused ? "#507DFA" : "#505050"} />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home-outline" size={moderateScale(24)} color={focused ? "#507DFA" : "#505050"} />
          ),
        }}
      />
      <Tab.Screen
        name="Group"
        component={Group}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="people-outline" size={moderateScale(24)} color={focused ? "#507DFA" : "#505050"} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { loading } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(loginWithToken())
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{
          position: "absolute",
          zIndex: 10
        }}>
          <ActivityIndicator size="large" color="#B3B3B3" />
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={!user ? "Login" : "MainTabs"}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Agree" component={Agree} options={{
          title: "약관 동의",
          headerStyle: { backgroundColor: '#161616', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#FFFFFF",
          headerBackTitle: ''
        }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{
          title: "회원가입",
          headerStyle: { backgroundColor: '#FFFFFF', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#000000",
          headerBackTitle: ''
        }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="HrvMeasurement" component={HrvMeasurement} options={{
          title: "",
          headerStyle: { backgroundColor: '#0A0A0A', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#FFFFFF",
          headerBackTitle: ''
        }} />
        <Stack.Screen name="HrvResult" component={HrvResult} options={{
          title: "",
          headerStyle: { backgroundColor: '#0A0A0A', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#FFFFFF",
          headerBackTitle: ''
        }} />
        <Stack.Screen name="StairsTarget" component={StairsTarget} options={{
          title: "목표를 설정해봐요!",
          headerTintColor: "#FFFFFF",
          headerStyle: { backgroundColor: '#0A0A0A', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerBackTitle: ''
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

