import React from "react";
import {Container, Item, Form, Input, Button, Label} from "native-base"
import {Alert, Text} from "react-native"
import styles from "../styles/styles.scss";
import firebase from "firebase";

export default class SignupScreen extends React.Component {
  static navigationOptions = {
   title: "Đăng ký"
  }
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      confirm_password: null
    };
  }
  SignUp = async (email, password) => {
    try {
      if (email == null || password == null) {
        Alert.alert("Thông báo", "Hãy điền tên đăng nhập và mật khẩu")
      } else {
        if (this.state.password !== this.state.confirm_password){
          Alert.alert("\"Đăng ký thất bại", "Mật khẩu xác nhận không chính xác")
        } else {
          await firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
            if (error) {
              Alert.alert("Đăng ký thất bại", `${error.message}`)
            }
          })
        }

      }
    } catch (error) {
      console.log(error.toString(error));
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <Form style={{width: "80%",}}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input autoCapitalize="none" autoCorrect={false}
                   onChangeText={email => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input autoCapitalize="none" autoCorrect={false} secureTextEntry={true}
                   onChangeText={password => this.setState({password})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Confirm Password</Label>
            <Input autoCapitalize="none" autoCorrect={false} secureTextEntry={true}
                   onChangeText={confirm_password => this.setState({confirm_password})}
            />
          </Item>
          <Button full rounded success style={styles.btnSignup}
                  onPress={() => this.SignUp(this.state.email, this.state.password)}>
            <Text style={{color: "#fff"}}>Đăng Ký</Text>
          </Button>
        </Form>
      </Container>
    )
  }
}