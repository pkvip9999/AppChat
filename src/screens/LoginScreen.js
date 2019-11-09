import React from "react";
import {Container, Item, Form, Input, Button, Label} from "native-base"
import {Alert, Text,View} from "react-native"
import styles from "../styles/styles.scss";
import firebase from "firebase";


class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Đăng nhập"
  }

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }

  SignUp = async (email, password) => {
    try {
      if (email == null || password == null || email== "" || password=="") {
        Alert.alert("Thông báo", "Hãy điền tên đăng nhập và mật khẩu")
      } else {
        await firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
          if (error) {
            Alert.alert("Đăng ký thất bại", `${error.message}`)
          }
        })
      }
    } catch (error) {
      console.log(error.toString(error));
    }
  };
  SignIn = async (email, password) => {
    try {
      if (email == null || password == null) {
        Alert.alert("Thông báo", "Hãy điền tên đăng nhập và mật khẩu")
      } else {
        await firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
          Alert.alert("Đăng nhập thất bại", `${error.message}`)
        });

        // await firebase.auth().onAuthStateChanged((user) => {
        //   console.log(user)
        // })
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
          <View style={{marginVertical: 15}}>
            <Text style={{color:"red"}}
            onPress={() =>{
              this.props.navigation.navigate("ForgetPass")
            }}>Quên mật khẩu</Text>
          </View>
          <Button full rounded style={styles.btnLogin}
                  onPress={() => this.SignIn(this.state.email, this.state.password)}>
            <Text style={{color: "#fff"}}>Đăng nhập</Text>
          </Button>
          <Button full rounded success style={styles.btnSignup}
                  onPress={() => {
                    this.props.navigation.navigate("SignUp")
                  }}>
            <Text style={{color: "#fff"}}>Đăng Ký</Text>
          </Button>
        </Form>
      </Container>
    )
  }
}

export default LoginScreen
