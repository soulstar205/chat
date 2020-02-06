import React from 'react'
import io from 'socket.io-client';
//import Data from '../data'
import openSocket from 'socket.io-client';
import {Link} from 'react-router-dom'
import SideBar from '../sidebar/sideBar'
import ChatHeader from '../Header/chatHeaader'
import Messages from '../messaging/messages'
import Input from '../input/input'
import Ads from '../ads/ads'

import './chat.css'




const socket = openSocket('http://localhost:5000')


class Chat extends React.Component{
    constructor(){
        super()
        this.state={
            activeRoom: "General",
            user: [
                {
                    name: "Soul",
                    passWord: "galactus"
                }
            ],
            chatInput: '',
            messages: [ ],
            rooms:{
                    General:{
                    messages: ["you", "me"],
                    invitations: ["who got that magic", "you", " give em hell"]
                    },
               
                    Romance:{
                        messages: ["lets try out the romance thingy"],
                        invitations: ["Gonna have to blow em up"]
                    },
                    Computer:{
                        messages: [],
                        invitations: ["Who's got that virus "]
                    },
                    Movies:{
                        messages: [
                            "I fucking hate cinemas",
                        "I fucking hate cinemas",
                        "I fucking hate cinemas",
                        "I fucking hate cinemas",
                        "I fucking hate cinemas",
                        "I fucking hate cinemas",
                        "I fucking hate cinemas",
                        
                        ],
                        invitations: ["I fucking hate cinemas",
                        "I fucking hate cinemas",
                        "I fucking hate cinemas",
                        "I fucking hate cinemas",
                        "I fucking hate cinemas",
                        
                    ]
                    },
                    Women:{
                        messages: [],
                        invitations: []
                    },
                    Business:{
                        messages: [],
                        invitations: []
                    },
                    Scifi:{
                        messages: [],
                        invitations: []
                    },
                    Games:{
                        messages: [],
                        invitations: []
                    }
                }
            }
    }
    componentDidMount(){
        const {user} = this.state
        socket.emit('join', user)

        socket.on('visitors', users=>{
            this.setState({
                users: [users]
            })
        })
        
    }
    componentDidUpdate(){
        const {activeRoom, rooms} = this.state
        
        
        if(activeRoom in rooms){
            let Invitations = rooms[activeRoom].invitations
            if(Invitations){
                return Invitations
            } 
        }
    }

    setMessages=(text)=>{
        this.setState({chatInput : text})
        this.sendMessage()
    }
    sendMessage=()=>{
        const {chatInput, rooms, activeRoom} = this.state
        let messages = rooms[activeRoom].messages
        const newMessage = [...messages, chatInput]
        this.setState({messages: newMessage})

        socket.emit('send_messages', {activeRoom, messages})
        console.log(chatInput)
    }

    setActiveRoom=(room)=>{
        this.setState({activeRoom: room})
        const {activeRoom} = this.state
        socket.emit('join_room', activeRoom)
    }
    
    storeInviteTopics=(data)=>{
        const {activeRoom, rooms} = this.state
        let invitations = rooms[activeRoom].invitations
        let newInvitation = [...invitations, data]
        this.setState({invitations: newInvitation})
        socket.emit("invitations", {activeRoom, invitations})
        console.log(activeRoom, newInvitation)
       
    }
    render(){
      let {name} = this.state.user[0]
      const {rooms, activeRoom}= this.state
      let messages = rooms[activeRoom].messages
      let Iv = this.componentDidUpdate()
      console.log(Iv)
      

        return(
            <div className="container">
               <SideBar Iv={Iv}
               name={name}
               storeInviteTopics={this.storeInviteTopics}
               />
               <ChatHeader rooms={rooms}
               setActiveRoom={this.setActiveRoom}/>
               <Messages
               messages={messages}
               name={name}/>
               <Input 
               setMessages={this.setMessages}/>
               <Ads/>     
            </div>
        )
    }
}
export default Chat