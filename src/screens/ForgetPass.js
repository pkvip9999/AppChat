import React from "react";
import styles from "../styles/styles.scss";
import {Button, Container, Form, Input, Item, Label} from "native-base";
import {Alert,Text} from "react-native";
import firebase from "firebase";

export default class ForgetPass extends React.Component{
  static navigationOptions = {
    title: "Quên mật khẩu"
  }
  constructor(props) {
    super(props);
    this.state = {
      email: null
    };
  }
  ForgetPass = (email) =>{
    firebase.auth().sendPasswordResetEmail(email)
      .then(function (user) {
        Alert.alert("Thông báo",'Check email để đổi lại mật khẩu')
      }).then(()=>{
      this.props.navigation.navigate("Login")
    }).catch(function (error) {
      Alert.alert("Lỗi",`${error.message}`)
    })
  }
  render() {
    return (
      <Container style={styles.container}>
        <Form style={{width: "80%",}}>
          <Item floatingLabel>
            <Label>Email đăng ký</Label>
            <Input autoCapitalize="none" autoCorrect={false}
                   onChangeText={email => this.setState({email})}
            />
          </Item>
          <Button full rounded success style={styles.btnSignup}
                  onPress={() => this.ForgetPass(this.state.email)}>
            <Text style={{color: "#fff"}}>Xác nhận</Text>
          </Button>
        </Form>
      </Container>
    )
  }
}