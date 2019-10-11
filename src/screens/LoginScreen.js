import React from "react";
import {View, Text, AsyncStorage,TextInput, StyleSheet,TouchableOpacity} from "react-native";
import User from "../User";
import styles from "../styles/styles.scss";
import firebaseService from "../../services/firebase";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  constructor (props) {
    super(props);
    this.state = {
      name: null,
      phone: null
    }
  }
  handleChange = key => val  => {
    this.setState({
      [key]: val
    })
}
  submitForm = async () => {
    await AsyncStorage.setItem('userPhone',this.state.phone);
    User.phone = this.state.phone;
    firebaseService.database().ref("users/" + User.phone).set({name :  this.state.name})
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="phone"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder="name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TouchableOpacity onPress={this.submitForm}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
