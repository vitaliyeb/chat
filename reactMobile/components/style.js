import { StyleSheet} from 'react-native';
const MyStyle =  StyleSheet.create({
    view:{
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    viewChats: {
        flex: 1,
        flexDirection: 'column'
    },
    notMyMessage:{
        textAlign: 'left'
    },
    myMessage: {
        textAlign: 'right'
    },
    connected: {
        textAlign: 'center'
    }
});
export default MyStyle;
