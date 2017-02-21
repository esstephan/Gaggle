import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Right, Body, Footer, Content, Form, Item, Input, Icon, Button, Title, FooterTab } from 'native-base';
import Chat from '../Chat/Chat.js';
import GetUsers from './GetUsers.js';
import firebaseRef from '../../firebase/config.js';
import firebase from 'firebase';

const firebasedb = firebase.database();

export default class GroupView extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
    this.state = {
      users: []
    };
  }

  _handleChangePage() {
    this.props.navigator.push({
      component: Chat,
      title: 'Chat'
    });
  }

  componentDidMount() {
    var userArray = [];
    var query = firebase.database().ref('/users/').orderByKey();
    query.once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childDataName = childSnapshot.val().displayName;
        userArray.push(childDataName);
      })
    })
    .then(function() {
      this.setState({ users: userArray});
    }.bind(this))
  }

  render() {

    const userList = this.state.users.map((user) => {
      return (
        <View>
          <Text> {'\u2022'} {user}</Text>
          <Text></Text>
        </View>
      )
    });

    return (
      <Container>
        <Header>
          <Left></Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <Content>
          <View>
          {userList}
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this._handleChangePage}>
              <Text>Next Page</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
