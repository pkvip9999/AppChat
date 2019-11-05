import React from "react";
import {View, Text, TouchableOpacity, Alert, TextInput, AsyncStorage, Image} from "react-native";
import style from "../styles/styles.scss"
import {Container, Button, Content, Form, Item, Input, Label} from 'native-base';
import User from "../User";
import firebaseService from "../../services/firebase";
import firebase from "firebase";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      phone: "",

    }
  }

  componentWillMount() {
    const user = firebaseService.auth().currentUser;
    let dbRef = firebaseService.database().ref(`users`).orderByChild("uid").equalTo(user.uid);
    dbRef.on('child_added', (val) => {
      this.setState({
        name: val.val().displayName,
        phone: val.val().phoneNumber
      })
    })

  }

  change = async () => {
    const user = firebaseService.auth().currentUser;
    firebaseService.database().ref(`/users/${user.uid}`).update({
      displayName: this.state.name,
      phoneNumber: this.state.phone
    })
    Alert.alert("SUCCESS", "Thay đổi thông tin thành công")
  }
  Logout = () => {
    firebase.auth().signOut().then(function () {
      this.props.navigation.navigate('Auth')
    }).catch((error) => {
      console.log(error.message)
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Tên</Label>
              <Input value={this.state.name}
                     onChangeText={(val)=>{
                       this.setState({
                         name: val
                       })
                     }}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Phone</Label>
              <Input value={this.state.phone}
                     onChangeText={(val)=>{
                       this.setState({
                         phone: val
                       })
                     }}/>
            </Item>
          </Form>
          <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 50}}>
            <Button info block style={{marginTop: 15}} onPress={this.change}><Text style={{color:"#fff"}}> Change </Text></Button>
            <Button danger block style={{marginTop: 15}} onPress={this.Logout}><Text  style={{color:"#fff"}}> Logout </Text></Button>
          </View>
        </Content>
      </Container>
    )
  }
}