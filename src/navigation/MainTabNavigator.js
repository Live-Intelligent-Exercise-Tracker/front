import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import My from '../screens/Home/My';
import Home from '../screens/Home/Home';
import Group from '../screens/Home/Group';
import { Ionicons } from 'react-native-vector-icons';
import { moderateScale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home"
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
        name="Home"
        component={Home}
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

export default MainTabNavigator
