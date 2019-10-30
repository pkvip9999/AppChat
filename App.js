import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen"
import ChatScreen from "./src/screens/ChatScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SignUpSuccess from "./src/screens/SignUpSuccess";
import {Image, TouchableOpacity,View} from "react-native";
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
class NavigationDrawerStructure extends React.Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('./assets/menu-button-of-three-horizontal-lines.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const AuthStack = createStackNavigator({Login: LoginScreen});
const Success = createStackNavigator({SignUpSuccess: SignUpSuccess});
const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
  Chat : ChatScreen
});

const Profile = createStackNavigator({
  Second: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

const DrawerNav = createDrawerNavigator(
  {
    Screen1: {
      screen: AppStack,
      navigationOptions: {
        drawerLabel: 'Trang chủ',
      },
    },

    Screen2: {
      screen: Profile,
      navigationOptions: {
        drawerLabel: 'Thông tin cá nhân',
      },
    },
  },
  {
    initialRouteName : "Screen1",
    drawerPosition: "left",
  }
)


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      SignUpSuccess: Success,
      App: DrawerNav,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
