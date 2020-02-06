const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')
const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const getVisitors =()=>{
    let clients = io.sockets.clients().connected
    let sockets = Object.values(clients)
    let users = sockets.map(s => s.user)
    return users
}
const emitVisitors =()=>{
    io.emit('visitors', getVisitors())
}

io.on('connection', (socket)=>{
    

    socket.on('join', (user, callback)=>{
        console.log(user)
        socket.user = user

        socket.on('join_room', room=>{
            socket.join(room)
            console.log("user has joined", room)
        })
    })

    socket.on('send_messages', ({activeRoom, messages})=>{
        
        io.to(activeRoom).emit('send_messages',({
            messages, 
            name: "soul"
        }))
        console.log(activeRoom, messages)
        
    })
    socket.on('invitations', ({activeRoom, invitations})=>{
        io.to(activeRoom).emit('send_messages', ({
            invitations
        }))
        console.log(activeRoom, invitations)
    })

    socket.on('disconnect', ()=>{
        console.log('user left')
    })
})

app.use(router)

server.listen(PORT, ()=> console.log(`server as started on port : ${PORT}`))