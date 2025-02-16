import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/Login/Login";
import Agree from "./pages/SignUp/Agree";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Agree" component={Agree} options={{ title: "약관 동의" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


