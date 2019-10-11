import React from "react";
import {Text, TextInput, SafeAreaView,Dimensions, TouchableOpacity, View,FlatList} from "react-native"
import styles from "../styles/styles.scss"
import firebaseService from "../../services/firebase";
import User from "../User";

export default class ChatScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name', null)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      person: {
        name: props.navigation.getParam('name', null),
        phone: props.navigation.getParam('phone', null)
      },
      textMessage: '',
      messageList : []
    }
  }

  componentWillMount() {
    firebaseService.database().ref("message").child(User.phone).child(this.state.person.phone)
      .on('child_added',(value) => {
        this.setState((prevState)=> {
          return {
            messageList: [...prevState.messageList,value.val()]
          }
        })
      })
  }

  handleChange = key => val => {
    this.setState({
      [key]: val
    })
  }
  convertTime = (time) => {
    let d = new Date(time)
    let c = new Date()
    let result = (d.getHours() < 10 ? "0": "" ) + d.getHours() + ":"
    result += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes()
    if (c.getDay() !== d.getDay()) {
      result = d.getDay()+ " " + d.getMonth() + " " + result
    }
    return result

  }
  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      let msgId = firebaseService.database().ref("messages").child(User.phone).child(this.state.person.phone).push().key
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: firebaseService.database.ServerValue.TIMESTAMP,
        from: User.phone
      }
      updates[`message/${User.phone}/${this.state.person.phone}/${msgId}`] = message
      updates[`message/${this.state.person.phone}/${User.phone}/${msgId}`] = message
      firebaseService.database().ref().update(updates);
      this.setState({
        textMessage: ""
      })
    }
  }

  renderRow = ({item}) => {
    return (
      <View style={{
        ...styles.message,
        alignSelf: item.from===User.phone ? "flex-end" :"flex-start",
        backgroundColor: item.from===User.phone ? "#00897b" : "#7cb342",
      }}>
        <Text style={{
          color: "#fff",
          padding: 7,
          fontSize: 16
        }}>
          {item.message}
        </Text>
        <Text style={{
          color:"#eee",
          padding: 3,
          fontSize: 12,
        }}>
          {this.convertTime(item.time)}
        </Text>
      </View>
    )
  }
  render() {
    let {height,width} = Dimensions.get('window')
    return (
      <SafeAreaView>
        <FlatList
          style={{
            padding:10,
            height: height*0.8,
            width: width
          }}
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.formInput}>
          <TextInput
            style={styles.inputMess}
            placeholder="Nhập"
            onChangeText={this.handleChange("textMessage")}
            value={this.state.textMessage}
          />
          <TouchableOpacity onPress={this.sendMessage}>
            <Text style={styles.btnText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}