import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AuthLoadingScreen  from "./src/screens/AuthLoadingScreen"
import ChatScreen from "./src/screens/ChatScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SignUpSuccess from "./src/screens/SignUpSuccess";
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator({ Home: HomeScreen, Chat : ChatScreen , ProfileScreen : ProfileScreen});
const AuthStack = createStackNavigator({ Login: LoginScreen });
const Success = createStackNavigator({SignUpSuccess: SignUpSuccess});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      SignUpSuccess: Success,
      App: AppStack,
      Auth: AuthStack,

    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
