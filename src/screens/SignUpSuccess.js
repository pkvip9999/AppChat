import React from "react";
import {View, Text, Alert} from "react-native";
import {Button, Container, Form, Input, Item, Label} from "native-base";
import styles from "../styles/styles.scss"
import firebase from "firebase";

export default class SignUpSuccess extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Đăng ký thành công",
    }
  }
  constructor(props){
    super(props);
    this.state = {
      name:null
    }
  }
  componentDidMount() {
    Alert.alert("Welcome", "Chào mừng bạn đến với app chat của chúng tôi :))))")
  }
  updateName = (name) => {
    if (name) {
      firebase.auth().currentUser.updateProfile({
        displayName: name
      }).then(() => {
        this.props.navigation.navigate( 'App')
      })
        .catch((error) => {
          Alert.alert("Lỗi",`${error.message}`)
        })
    } else Alert.alert("Thông báo","Tên không được để trống")
  }
  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Text style={{fontSize:24,alignItems:"center"}}>
            Nhập tên hiển thị
          </Text>
          <Item floatingLabel style={{width:"80%"}}>
            <Label>Tên của bạn</Label>
            <Input autoCapitalize="none" autoCorrect={false}
              onChangeText={name => this.setState({name})}
            />
          </Item>
          <Button full rounded style={styles.btnLogin} onPress={()=>{this.updateName(this.state.name)}}>
            <Text style={{color: "#fff"}}>Đăng nhập</Text>
          </Button>
        </Form>
      </Container>
    )
  }
}