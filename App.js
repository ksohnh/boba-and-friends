import { View, Text } from "react-native";
import React from 'react';
import Initial from "./pages/Initial"
import Shop from "./pages/Shop"
import Search from "./pages/Search"
import User from "./pages/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { auth, onAuthStateChanged } from "./src/firebase/config";
import { useEffect } from "react";

// the base file for the app, has the navigation containers

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// the stack for the home screen
const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Initial" component={Initial}></Stack.Screen>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
  );
}

// the stack for the user page
const LoginScreenNavigator = () => {
  // checking if they logged in
  const [user, setUser] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(auth, (curUser)=>{
      if(curUser){
        setUser(curUser)
      }
      else{
        setUser(null)
      }
    })
  })

  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        { user ? (
          <Stack.Screen name="User" component={User}/>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={Register} />
          </>
        )}
    </Stack.Navigator>
  )
}

// the bottom tab navigator for the entire app
export default function App() {
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="Home" component={HomeScreenNavigator}></Tab.Screen>
        <Tab.Screen name="Profile" component={LoginScreenNavigator}></Tab.Screen>
        {/* <Tab.Screen name="Explore" component={Explore}></Tab.Screen> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}