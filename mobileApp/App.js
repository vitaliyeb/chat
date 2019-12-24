import React from 'react';
import io from 'socket.io-client';
import {
  View,
  Text,
} from 'react-native';

class App extends React.Component{
    constructor(){
        super();
        this.test = fetch('http://localhost:5000/test').then((res)=> res).then(res=>console.log('test!!!!!!!!!!!!!',res));
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
