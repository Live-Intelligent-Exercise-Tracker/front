import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyInfo from '../screens/Home/MyInfo';
import Home from '../screens/Home/Main/Home';
import Group from '../screens/Home/Group';
import { Ionicons } from 'react-native-vector-icons';
import { moderateScale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0E0F10',
          borderTopWidth: 0, 
          elevation: 0,       
          shadowOpacity: 0,   
        },
      }}>
      <Tab.Screen
        name="MyInfo"
        component={MyInfo}
        options={{
          title: '마이페이지',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person-outline" size={moderateScale(24)} color={focused ? "#507DFA" : "#ffffff"} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home-outline" size={moderateScale(24)} color={focused ? "#507DFA" : "#ffffff"} />
          ),
        }}
      />
      <Tab.Screen
        name="Group"
        component={Group}
        options={{
          title: '그룹',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="people-outline" size={moderateScale(24)} color={focused ? "#507DFA" : "#ffffff"} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
