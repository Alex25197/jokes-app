import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import HapticTab from "../Components/HapticTab";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#131112",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={28} color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <AntDesign name="star" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
