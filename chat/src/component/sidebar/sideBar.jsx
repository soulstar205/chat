import React from 'react'
import Popover from 'react-tiny-popover'
import './sidebar.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import {FaBeer, FaAccessibleIcon} from 'react-icons/fa'
import { MdDns} from 'react-icons/md'
import {Link} from 'react-router-dom'




class SideBar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            chatInput: '',
            inviteTopics: '',
            isPopoverOpen: false, 
            isHoverOpen: false,
            friendNo: '24',
            
        }
    }
    TogglePopover=()=>{
        const {isPopoverOpen} = this.state
        this.setState({isPopoverOpen: !isPopoverOpen})
    }
    handleChange=(e)=>{
        
        this.setState({inviteTopics: e.target.value})
    }
    sendChatAction=(e)=>{
        e.preventDefault()
        const {inviteTopics} = this.state
        this.props.storeInviteTopics(inviteTopics)
        this.setState({inviteTopics: ''})
        this.TogglePopover()
    }
    PrivateChat=()=>{
        
    }
    ShowInfo=()=>{
        const {isHoverOpen} = this.state
        this.setState({isHoverOpen: !isHoverOpen})
    }
   


    render(){
        const {isPopoverOpen, inviteTopics, friendNo, isHoverOpen} = this.state
        const {Iv, name} = this.props
        
        return(
            <div>
                <div className="chat-invites">
                        <div className="profile">

                            <div className="logo">
                            <div className="logo-left">Logo</div>
                            <div className='logo-right'>
                             <div className="tooltip">
                                <span className="tooltiptext-icons">Logout</span>
                                <Link to={`/?`}>
                                  <MdDns color="blue" className="icons"/>
                                </Link>
                              </div>
                            </div>
                            </div>

                            <div className="user-profile">
                            <div className="profile-pic-div">
                                 <img src="hot.jpg" alt="" className="profile-pic"/>
                            </div>
                                
                                <div className="name-friends">

                                <div className="tooltip">
                                    <span className="tooltiptext-icons">Messages</span>
                                <Link to={`/userProfile?`}><FaBeer color="blue" className="icons"/></Link>
                                </div>

                                <div className="tooltip">
                                    <span className="tooltiptext-icons">Friends Online</span>
                                    <Link to={`/userProfile?`}><MdDns color="blue" className="icons"/></Link>
                                </div>

                                    <div className="tooltip">
                                    <span className="tooltiptext-icons">Edit profile}</span>
                                    <Link to={`/userProfile?`}> <FaAccessibleIcon color="blue" className="icons"/></Link>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <hr className="chat-iv"/>
                        <div className="invitations">
                          <div className="tooltip">
                          <span className="tooltiptext">click to start chatting with {name}</span>
                          <ScrollToBottom>
                          {
                               Iv.map((invites, index)=>{
                                    return(
                                        <div>
                                            <div className="invite-plus-photo-area">
                                            <img src="cutie.jpg" alt=" " className="chat-iv-user-photo"/>
                                            <div 
                                            key={index}
                                            className='invitee'
                                            onClick={this.PrivteChat}
                                            onMouseOver={this.ShowInfo}>
                                               <div className="username" >{name} </div> 
                                                {invites}
                                            </div>
                                        </div>
                                        <hr/>
                                        </div>   
                                    )
                                }) 
                            }
                            </ScrollToBottom>
                          </div>
                           
                            </div>
                        <div className="message-input">
                                <Popover
                                isOpen={isPopoverOpen}
                                padding={10}
                                className="chat-invite-message-form"
                                onClickOutside={this.TogglePopover}
                                content={({position, nedgedLeft, nudgedTop, targetRect, popoverRect})=>(
                                        <div>
                                        <form
                                        onSubmit={this.sendChatAction}
                                        >
                                        <input
                                            id="message"
                                            ref={"messageInput"}
                                            type="text"
                                            value={inviteTopics}
                                            onChange={this.handleChange}
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
                                    onClick={this.TogglePopover}
                                >Create chat invite</button>
                              </Popover>  
                        </div>
                    </div>
            </div>
        )
    }
}
export default SideBar