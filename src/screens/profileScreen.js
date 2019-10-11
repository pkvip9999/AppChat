import React from "react";
import {View, Text, TouchableOpacity, Alert, TextInput, AsyncStorage} from "react-native";
import style from "../styles/styles.scss"
import User from "../User";
import firebaseService from "../../services/firebase";

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Profile",
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      name: User.name
    }
  }

  handleChange = () => {
    this.setState({
      [key]: val
    })
  }
  changeName = async () => {
    if (User.name !== this.state.name) {
      firebaseService.database().ref('users').child(User.phone).set({name:this.state.name})
      Alert.alert("SUCCESS","Đổi tên thành công")
    }

  }
  Logout = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate("Auth");
  }
  render() {
    return (
      <View style={style.container}>
        <Text style={{fontSize: 20}}>
          {User.phone}
        </Text>
        <TextInput value={this.state.name}
                   onChangeText={this.handleChange}
                   style={{...style.input, marginTop:15}}
        />
        <TouchableOpacity onPress={this.changeName("name")}>
          <Text style={style.btnText}>ĐỔI TÊN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginVertical:15}} onPress={this.Logout}>
          <Text style={style.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}