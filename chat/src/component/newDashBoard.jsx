import React, {useState} from 'react'
import Popover from 'react-tiny-popover'
import {Context} from '../store'


const DashBoard = () =>{


    const [username] = React.useState('Mark Jacobs')
    const [chatInput, setChatInput] = useState('')
    const [inviteTopics, setInviteTopics] = React.useState('')
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
    const [FriendNo] = React.useState('27')


    const time = new Date()
    const currentTime = `${time.getHours()}:${time.getMinutes()}`
    
    const {allChats, sendChatAction, user} = React.useContext(Context)
    console.log([allChats])

    const rooms = Object.keys(allChats)
    const [activeRoom, setActiveRoom] = React.useState(rooms[0])
    
    const TogglePopover = ()=>{
        setIsPopoverOpen(!isPopoverOpen)
    }
   
    
    


    return(
        <div className="container">
                
                    <div className="chat-invites">
                        <div className="profile">
                            <div id="logo">Logo</div>
                            <div className="user-profile">
                                <img src="logo192.png" alt="" className="profile-pic"/>
                                <div className="name-friends">
                                    <p>{username}</p>
                                    <p>{FriendNo} friends</p>
                                </div>
                                <p className="edit-profile">Edit Profile</p>
                            </div>
                        </div>
                        <div className="chat-iv"> <p>Chat invitations</p></div>  
                        <div className="invitations">
                            {
                               allChats[activeRoom].map((invites)=>{
                                    return(
                                        <div>
                                            <div className="invite-plus-photo-area">
                                            <img src="logo192.png" alt=" " className="chat-iv-user-photo"/>
                                            <div 
                                            key={invites.id}
                                            className='invitee'>
                                               <div className="username">{username}  </div> 
                                                {invites.iv}
                                            </div>
                                        </div>
                                        <hr/>
                                        </div>   
                                    )
                                }) 
                            }  
                        </div>
                        <div className="message-input">
                                <Popover
                                isOpen={isPopoverOpen}
                                padding={10}
                                className="chat-invite-message-form"
                                onClickOutside={TogglePopover}
                                content={({position, nedgedLeft, nudgedTop, targetRect, popoverRect})=>(
                                        <div>
                                        <form
                                        onSubmit={()=>{sendChatAction()}}
                                        >
                                        <input
                                            id="message"
                                            ref={"messageInput"}
                                            type="text"
                                            value={inviteTopics}
                                            onChange={e => setInviteTopics(e.target.value)}
                                            className="chat-invite-message-form"
                                            autoComplete={"off"}
                                            placeholder= "Enter your topic of conversion and press ENTER"
                                            autoFocus
                                            />      
                                        </form>
                                    </div>
                                )}
                                 >
                                 <button 
                                    type ="submit"
                                    className="send"
                                    onClick={TogglePopover}
                                >Create chat invite</button>
                                 </Popover>
                        </div>
                    </div>
                    <div className="chat-header">
                                {
                                    rooms.map((rooms)=>{
                                        return(
                                            <div key={rooms}
                                            className="room"
                                            onClick={e=> setActiveRoom(e.target.innerText)}
                                            >
                                                {rooms}
                                            </div>
                                        )
                                    })
                                }
                    </div>
                    <div className="thread-container">
                        {
                            allChats[activeRoom].map(( mes)=>{
                                return (
                                    <div
                                        key={mes.id}
                                        className={`message-container ${mes.user === user && 'right'}`}
                                    >
                                        <div className="time">{currentTime}</div>
                                        <div className="data">
                                            <div className="message">{mes.msg}</div>
                                            <div className="name">{mes.from}</div>
                                        </div>
                                    </div>

                                    )  
                            })
                        }
                    </div>
                    <div className="ad-section">
                        <div className="ad-1">Ad 1</div>
                        <div className="ad-2">Ad 2</div>
                    </div>
                    <div className="message-input">
                    <form
                    className="message-form"
                    onSubmit={(e)=>{sendChatAction({user: user, msg:chatInput, room: activeRoom})
                                    setChatInput('') 
                                    e.preventDefault()
                                } }>
                    <input 
                        id="message"
                        type="text"
                        className="form-control"
                        onChange={e => setChatInput(e.target.value)}
                        autoComplete={"on"}
                        value={chatInput}
                        placeholder= "Type Something Interesting"
                        />  
                        <button 
                            disabled={chatInput.length < 1}
                            type="submit"
                            className="send"
                            >Send</button>                  
                    </form>
                    </div>
                    
            </div>
    )
}
export default DashBoard