import React, {Component} from 'react';
import {TextInput, Button} from 'react-native';


class Registration extends Component{
    constructor(props){
        super(props);
        this.state = {
            text : ''
        }
    }

    render() {
        return(
            <>
                <TextInput
                    placeholder={'Login...'}
                    value={this.state.text}
                    onChangeText={text => this.setState({text: text})}
                />
                <Button
                    title="Auth"
                    color="#f194ff"
                    onPress={() => this.props.authentication(this.state.text)}
                />
            </>
        )
    }
}


export default Registration;