import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client';


let socket;
const rooms = ['General', 'Computer', 'Scifi']

const Chat=({location})=>{
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000'

    
    useEffect(()=>{
        let name = queryString.parse(location.search)
        console.log(name)
        name = JSON.stringify(name)
        let newName = Object.values(name)

       

        socket = io(ENDPOINT)

        setName(newName)
        
        
     
        socket.emit('join', {name, room}, ()=>{
           
        })

        return () =>{
            socket.emit('disconnect')

            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message])
        })
    }, [messages])


    //function for sendMessage
    const sendMessage=(event)=>{
        event.preventDefault()

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
            
        }
    }
   
   
    console.log(message, messages)

    return(
        <div className="outerContainer">
            <div className="container">
                <input  
                value={message} 
                onChange={(e)=> setMessage(e.target.value)}
                onKeyPress={event => event.key === "Enter"? sendMessage(event): null }/>             
            </div>
            <div>
                {
                    rooms.map((room)=>{
                        return(
                            <ul key={room}>
                                <li value={room}
                                onClick={(e)=> setRoom(e.target.innerText)}>{room}</li>
                            </ul>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Chat