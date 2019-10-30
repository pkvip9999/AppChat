import React from 'react';
import User from "../User";
import styles from "../styles/styles.scss"
import firebase from "firebase";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (!user.displayName) {
          this.props.navigation.navigate( 'SignUpSuccess')
        } else this.props.navigation.navigate('App')
      } else this.props.navigation.navigate('Auth')
    })
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff"/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}