import React, {Component} from 'react';
import {FlatList, Text, View} from "react-native";
import {Container, Header, Left, Body, Content,Right, Button, Icon, Item, Label, Input} from 'native-base';
import firebaseService from "../../services/firebase";
import {ListItem} from "react-native-elements";
import styles from "../styles/styles.scss";
export default class SearchScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: null,
      data: null,
      users: []
    };
  }
  Search = async (text) =>{
    this.setState({
      users: [],
      data: null
    })
    if (text == null || text == ""){
      this.setState({data: "Không tim thấy kết quả",text:null})
    }else{

      const user = firebaseService.auth().currentUser;
      firebaseService.database().ref(`users`).orderByChild("email").startAt(text.toString()).endAt(text.toString()+"\uf8ff").on('value', (snap) => {
      if (!snap.val()) {
        this.setState({data: "Không tim thấy kết quả",text:null})
      }
        snap.forEach((child) => {
          if (user.uid !== child.key) {
            this.setState((prevState) => {
              return {
                users: [...prevState.users,[ child.val(),{time:"1"}]]
              }
            })
          }
        });
      });
    }
  }

  renderItem = ({item}) => {
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
    return (
      <Container>
        <Content>
          <Header style={{backgroundColor:"#fff",paddingTop:5}}>
            <Body style={{display:"flex",flexDirection:'row'}}>
              <Item >
                {/*<Label >Search</Label>*/}
                <Input placeholder="Nhập email cần tìm"  onChangeText={text => this.setState({text:text})}/>
              </Item>
            </Body>
            <Button  danger
                     onPress={() => this.Search(this.state.text)}>
              <Icon name='search' />
            </Button>
          </Header>
          {
            this.state.data &&
              <View style={{...styles.container}}>
                <Text style={{paddingVertical:30}}>{this.state.data}</Text>
              </View>
          }
          <FlatList
            data={this.state.users}
            renderItem={this.renderItem}
            keyExtractor={item => item.displayName}
          />
        </Content>
      </Container>
    );
  }
}