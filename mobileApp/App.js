import React from 'react';
import io from 'socket.io-client';

import {
  View,
  Text,
} from 'react-native';

class App extends React.Component{
    constructor(){
        super();
        this.socket = io('https://fierce-beyond-69381.herokuapp.com/');
        this.v = socket.on('test', (msg)=>{
            console.log(msg);
        });
        console.log('asasdshi!!');
    }

    render(){
        return(
            <>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>!!!</Text>
              </View>
            </>
        )
    }
}

export default App;
