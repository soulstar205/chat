import React from "react"
import './header.css'

const ChatHeader= ({rooms, setActiveRoom}) =>{


  
    return(
        <div className="chat-header" >
        {
            Object.keys(rooms).map((room, index)=>{
                return(
                    <div key={index}
                    className="room"
                    tabIndex="1"
                    onClick={e=> {setActiveRoom(room)} }
                    >
                        {room}
                    </div>
                )
            })
        }
        
       </div>
    )
}
export default ChatHeader 