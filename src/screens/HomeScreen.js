import React from "react";
import {SafeAreaView, View, Image, Text, FlatList, TouchableOpacity, AsyncStorage,} from "react-native";
import styles from "../styles/styles.scss";
import firebaseService from "../../services/firebase";
import User from "../User";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Chats",
      headerRight: (
        <TouchableOpacity onPress={()=> navigation.navigate("ProfileScreen")}>
          <Image source={require("../../assets/user.png")} style={{width:20,height:20, marginRight:15}}/>
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    let dbRef = firebaseService.database().ref('users');
    dbRef.on('child_added', (val) => {
      let person = val.val();
      person.phone = val.key
      if (person.phone === User.phone) {
        User.name = person.name
      } else {
        this.setState((prevState) => {
          return {
            users: [...prevState.users, person]
          }
        })
      }

    })

  }

  renderRow = ({item}) => {
    return (
      <TouchableOpacity style={styles.userItem}
                        onPress={() => this.props.navigation.navigate("Chat", item)}>
        <Text style={styles.userName}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={(item => item.phone)}
        />
      </SafeAreaView>
    )
  }
}