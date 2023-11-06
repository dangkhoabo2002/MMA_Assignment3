import { View, Text } from "react-native";
import React from "react";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import Favorite from "../screens/Detail";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerStyle: { backgroundColor: "#FBDABB" } }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Favorite" component={Favorite} />
    </Stack.Navigator>
  );
}
