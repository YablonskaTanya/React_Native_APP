import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import LoginScreen from "./LoginScreen";
// import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();
  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        tabBarStyle: {
          paddingTop: 16,
          paddingBottom: 26,
          paddingRight: 40,
          paddingLeft: 40,
          borderWidth: 1,
          borderTopColor: "#BDBDBD",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerStyle: {},

          tabBarIcon: () => (
            <TouchableOpacity
            // onPress={() => navigation.navigate("PostsScreen")}
            >
              <AntDesign name="appstore-o" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity

            // onPress={() => navigation.navigate("PostsScreen")}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          tabBarIcon: () => (
            <TouchableOpacity
              style={styles.addBtn}
              // onPress={() => navigation.navigate("PostsScreen")}
            >
              <AntDesign name="plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: "ProfileScreen",
          tabBarIcon: () => (
            <TouchableOpacity
            // onPress={() => navigation.navigate("LoginScreen")}
            >
              <Feather name="user" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  addBtn: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});

export default Home;