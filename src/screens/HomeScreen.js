import React from "react";
import {Button, View, Image, Text, FlatList, TouchableOpacity, AsyncStorage,} from "react-native";
import {Container, Content, Body} from 'native-base';
import {ListItem, Header} from 'react-native-elements'
import {Avatar} from 'react-native-elements';
import styles from "../styles/styles.scss";
import firebaseService from "../../services/firebase";
import firebase from "../../firebase";


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  componentWillMount () {
    const user = firebaseService.auth().currentUser;
    let data = firebaseService.database().ref(`message/${user.uid}`);
    data.on('child_added', (val) => {
      let dbRef = firebaseService.database().ref(`users`).orderByChild("uid").equalTo(val.key);
      dbRef.on('child_added', (val) => {
        this.setState((prevState) => {
          return {
            users: [...prevState.users,[ val.val(),{time:"1"}]]
          }
        })
      })
    })

  }

  renderItem = ({item}) => {
    console.log(item[1])
    return (
      <ListItem
        title={item[0].displayName}
        subtitle={item.subtitle}
        leftAvatar={{
          source: item.avatar_url && {uri: item.avatar_url},
          title: item[0].displayName.charAt(0),
          showEditButton: true,
          size: "medium",

        }}
        // rightTitle={`ssss`}
        // rightSubtitle={'ddd'}
        bottomDivider
        onPress={() => {
          this.props.navigation.navigate("Chat", item[0])
        }}
      />

    );

  };

  render() {
    console.log(this.state)
    return (
      <Container style={styles.container}>
        <Content style={{width: "100%"}}>
          <FlatList
            data={this.state.users}
            renderItem={this.renderItem}
            keyExtractor={item => item.displayName}
          />
        </Content>
      </Container>
    )
  }
}