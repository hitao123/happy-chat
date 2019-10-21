const express = require('express');
const app = express();


const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 4000;

const users = []; // 存储用户名，用户名唯一
const usersInfo = []; // 存储完整用户信息

app.all('*', function(req, res, next) {

    const header = req.headers['origin']
    res.header("Access-Control-Allow-Origin", header);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

    if (req.method == "OPTIONS") {
        res.send(200);
    } else  {
        next();
    }
});

/**
 * 建立连接
 * io.emit(foo); //会触发所有用户的foo事件
 * socket.emit(foo); //只触发当前用户的foo事件
 * socket.broadcast.emit(foo); //触发除了当前用户的其他用户的foo事件
 */
io.on('connect', (socket) => {

    // 获取登录用户信息
    socket.on('login', (user) => {
        if (users.indexOf(user.nickName) > -1) {
            socket.emit('userRepeat');
        } else {
            users.push(user.nickName);
            usersInfo.push(user);

            socket.nickName = user.nickName; // 将当前连接用户存储起来

            io.emit('enterAndLeft', {
                name: user.nickName,
                status: '进入'
            });

            socket.emit('loginSuccess');
            io.emit('onlineUser', usersInfo);
        }
    });


    /**
     * 发送消息事件
     * 后台收到任意一条消息，已广播的方式传播出去
     */
    socket.on('sendMsg', (data) => {
        console.log(data);
        const index = users.indexOf(socket.nickName);
        const avatar = usersInfo[index].avatar;

        // 其他人显示
        socket.broadcast.emit('receiveMsg', {
            name: socket.nickName,
            avatar,
            msg: data.messsge,
            side: 'left'
        });

        // 自己消息显示，主要是为了区分左右两边，好做样式处理
        socket.emit('receiveMsg', {
            name: socket.nickName,
            avatar,
            msg: data.messsge,
            side: 'right'
        });
    });
});


io.on('disconnect', (socket) => {

    const index = users.indexOf(socket.nickName);

    if (index > -1) {
        users.splice(index, 1);
        usersInfo.splice(index, 1);

        io.emit('enterAndLeft', {
            name: user.nickName,
            status: '离开'
        });

        io.emit('onlineUser', usersInfo);
    }

});





http.listen(PORT, () => {
    console.log(`listening port ${PORT}....`)
});