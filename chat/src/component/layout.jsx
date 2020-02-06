import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './join/join';
import Chat from './chat/chat';
import MessageBox from './chat/testMessage'
import UserProfile from './userProfile/userProfile'



class Layout extends React.Component{
    constructor(props){
        super(props)
        this.state={
            room: 'general',
            name: 'Soul'
        }
    }
    setUser=(name)=>{
        this.setState({name})
        alert(name)
    }

    

    render(){
        const {name, room} = this.state
        return(
            <div>
        <Router>
            <Route path="/" exact render={(props)=> <Join {...props} setUser={this.setUser}/>}/>
            <Route path="/chat" exact render={(props)=> <Chat {...props} name={name} room={room}/>}/>
            <Route path="/userProfile" exact render={(props)=> <UserProfile {...props} />}/>
            <Route path="/testMessage" exact render={(props)=> <MessageBox {...props} name={name} room={room}/>}/>
        </Router>
    
            </div>
        )
    }  
}
export default Layout