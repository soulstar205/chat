import React from 'react'
import './message.css'

const Message=({name, message})=>{


   const time = new Date()
   const currentTime = `0${time.getHours()}:${time.getMinutes()}`

   return(
        <div className={`message-container ${name && 'right'}`}>
            <div className="time">{currentTime}</div>
            <div className="data">
                <div className="message">{message}</div>
                <div className="name">{name}</div>
            </div>
            
        </div>
   )
}
export default Message