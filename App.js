import { View, Text } from "react-native";
import React from 'react';
import Home from "./pages/Home"
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


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
  );
}

const LoginScreenNavigator = () => {
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

export default function App() {
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="Home" component={HomeScreenNavigator}></Tab.Screen>
        <Tab.Screen name="User" component={LoginScreenNavigator}></Tab.Screen>
        {/* <Tab.Screen name="Explore" component={Explore}></Tab.Screen> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}