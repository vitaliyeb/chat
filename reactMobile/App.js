import React from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import Registration from "./components/registracion";
import Chats from './components/chats'
import MyStyle from "./components/style";
const domain = 'https://fierce-beyond-69381.herokuapp.com';

class App extends React.Component{
  constructor(){
    super();
   this.authentication = this.authentication.bind(this);
    this.state = {
        text: '',
        login: '',
        open: false,
    };
  }
  render() {
    return (
        <View style={MyStyle.view}>
            {this.state.open ? <Chats login={this.state.login} /> : <Registration authentication={this.authentication} />}
        </View>
    );
  }
  authentication(userDataReq){
      fetch(`${domain}/api/register`, {
          method: 'POST',
          body: JSON.stringify({login: userDataReq})
      })
          .then(res => res.json())
          .then(res => {
              res.userCreate ? this.setState({open: res.userCreate, login: userDataReq }) : Alert.alert('Such user exists');
          })
  }
};

export default App;
