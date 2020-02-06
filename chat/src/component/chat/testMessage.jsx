import React from 'react'
import openSocket from 'socket.io-client';


const socket = openSocket('http://localhost:5000')

class MessageBox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            input: '',
            user: '',
            room: '',
            messages: ''
        }
    }
    componentDidMount(){
        const {name} = this.props.location.user
        const {room} = this.props.location.roomName

        console.log(room, name)
        this.setState({user: name, room: room})
    }

    handleChange=(e)=>{
        this.setState({input: e.target.value})
    }
    sendMessage(){
        let {messages, room} = this.state
        socket.emit('send_messages', {room, messages})
    } 
    
    handleSubmit=(e)=>{
        e.preventDefault()
        const {input, messages, user, room} = this.state
        const newMessage = [...messages, input]
        this.setState({messages: newMessage})
        this.setState({input: ''})

        this.sendMessage()
    }

    

    render(){
        const {messages} = this.state
        return(
            <div>
                
                <form onSubmit={this.handleSubmit}>
                <input 
                type="text"
                value={this.state.input}
                onChange={this.handleChange}
                />
                </form>
                <div>{messages}</div>
                
            </div>
        )
    }
}
export default MessageBox