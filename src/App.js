import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
// no need to specify the file at the end of the path, by default, it will import from index.js.
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state={
    loggedIn: null
  }

  // webSetup from FBase, only take the object.
  componentWillMount(){
    firebase.initializeApp({
    apiKey: "AIzaSyDVVyR-iwQu9rXD11_49UzY4PRaiShlUGw",
    authDomain: "nataliacalt-authentication.firebaseapp.com",
    databaseURL: "https://nataliacalt-authentication.firebaseio.com",
    projectId: "nataliacalt-authentication",
    storageBucket: "nataliacalt-authentication.appspot.com",
    messagingSenderId: "808527282085"
  });
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      this.setState({ loggedIn: true })
    } else {
      this.setState({ loggedIn: false })
    }
  })
  }

  renderContent(){
    switch(this.state.loggedIn){
    case true:
      return (
        <Button onPress={() => firebase.auth().signOut()}>
          Log Out
        </Button>
      )
    case false:
      return <LoginForm />
    default:
      return
        <Spinner size='large' />
    }
  }

  render(){
    return (
      <View>
        <Header headerText='Authentication'/>
        {this.renderContent()}
      </View>

    );
  }
}

export default App;
