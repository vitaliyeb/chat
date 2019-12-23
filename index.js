const express =  require('express');
const app = express();
const http = require( 'http' ).createServer(app);
const io = require('socket.io')(http);
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;

let messageArray = [],
    allUsers = [],
    getCookie = function(req) {
        return allUsers.find(item => {
            return item.login == req.cookies.login;
        })
    }

app.use(express.static('client/build', {redirect: false, index: ''}));
app.use(cookieParser());

app.get('/chats', (req,res) => {
    if(getCookie(req)){
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    } else {
        res.redirect('/open');
    }
});
io.on('connection', function(socket){
    socket.on('open user', function(msg){
        messageArray.push({messageValue: `${msg} connected`, typeMessage: 'connected'});
        io.emit('firstMessageRender', JSON.stringify(messageArray));
    });
    socket.on('send message', function(message){
        io.emit('last message', message);
        messageArray.push(JSON.parse(message));
    });
});
app.get('/open', (req,res) => {
    if(getCookie(req)){
        res.redirect('/chats');
    } else {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'login.html'));
    }
});


app.post('/api/register', (req, res) => {
    let data ='';
    req.on('data', (chunk)=> {
        data+=chunk;
    });
    req.on('end', ()=> {
        let user = JSON.parse(data);
        if(allUsers.find((item)=>{
            return item.login == user.login
        })){
            res.jsonp({ userCreate: false });
        } else{
            allUsers.push({login: user.login});
            res.cookie('login', user.login);
            res.jsonp({ userCreate: true });
        }
    })

})

http.listen( PORT, () => {
    console.log('app run on port 3000')
});
