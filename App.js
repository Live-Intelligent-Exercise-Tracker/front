import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { moderateScale } from 'react-native-size-matters';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from 'react-native-vector-icons';
import Login from "./pages/Login/Login";
import Agree from "./pages/SignUp/Agree";
import Main from "./pages/Main/Main";
import My from "./pages/Main/My";
import Group from "./pages/Main/Group";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Agree" component={Agree} options={{
          title: "약관 동의",
          headerStyle: { backgroundColor: '#161616', shadowOpacity: 0, elevation: 0, borderBottomWidth: 0, },
          headerTintColor: "#FFFFFF",
          headerBackTitle: ''
        }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


