import React from "react";
import {convertTime} from "../helper";
import {
  Text,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from "react-native"
import {KeyboardAccessoryView, KeyboardAccessoryNavigation} from 'react-native-keyboard-accessory'
import styles from "../styles/styles.scss"
import {Header} from 'react-navigation';
import firebaseService from "../../services/firebase";
import firebase from "firebase";


export default class ChatScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('displayName', null),
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      person: {
        name: props.navigation.getParam('displayName', null),
        uid: props.navigation.getParam('uid', null)
      },
      textMessage: '',
      messageList: []
    }
  }

  //
  componentWillMount() {
    let user = firebase.auth().currentUser;
    firebaseService.database().ref("message").child(user.uid).child(this.state.person.uid)
      .on('child_added', (value) => {
        this.setState((prevState) => {
          return {
            messageList: [...prevState.messageList, value.val()]
          }
        })
      })
  }

  handleChange = key => val => {
    this.setState({
      [key]: val
    })
  }
  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      let user = firebaseService.auth().currentUser;
      let msgId = firebaseService.database().ref("messages").child(user.uid).child(this.state.person.uid).push().key
      let updates = {};
      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL
        }
      }
      updates[`message/${user.uid}/${this.state.person.uid}/${msgId}`] = message
      updates[`message/${this.state.person.uid}/${user.uid}/${msgId}`] = message
      firebaseService.database().ref().update(updates);
      this.setState({
        textMessage: ""
      })
    }
  }

  renderRow = ({item}) => {
    let user = firebase.auth().currentUser;
    return (
      <View style={{
        ...styles.message,
        alignSelf: item.from.uid === user.uid ? "flex-end" : "flex-start",
        backgroundColor: item.from.uid === user.uid ? "#00897b" : "#7cb342",
      }}>
        <Text style={{
          color: "#fff",
          padding: 7,
          fontSize: 16
        }}>
          {item.message}
        </Text>
        <Text style={{
          color: "#eee",
          padding: 3,
          fontSize: 12,
        }}>
          {convertTime(item.time)}
        </Text>
      </View>
    )
  }

  render() {
    let {height, width} = Dimensions.get('window')
    return (
      <View style={{...s.container}}>
        <ScrollView>
          <FlatList
            style={{
              padding: 10,
              height: height * 0.8,
              width: width
            }}
            data={this.state.messageList}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={80}>
          <View style={s.textInputView}>
            <TextInput
              placeholder="Nhap"
              style={s.textInput}
              onChangeText={this.handleChange("textMessage")}
              value={this.state.textMessage}
              multiline={true}/>
            <Button
              style={s.textInputButton}
              title="Send"
              onPress={this.sendMessage}/>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}
const s = StyleSheet.create({
  container: {
    flex: 1
  },
  textInputView: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    textAlignVertical: 'top'
  },
  textInputButton: {
    flexShrink: 1,
  }
});
