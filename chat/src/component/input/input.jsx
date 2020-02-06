import React from 'react'
import './input.css'
import Popover from 'react-tiny-popover'

class Input extends React.Component{
    constructor(props){
        super(props)
        this.state={
            texts: '',
            isPopoverOpen: false,
            file: null
        }
    }
    handleFile=(e)=>{
        e.preventDefault()
        this.setState({
            file1: URL.createObjectURL(e.target.files[0])
        })
    }
    TogglePopover=()=>{
        const {isPopoverOpen} = this.state
        this.setState({isPopoverOpen: !isPopoverOpen})
    }
   
    handleChange=(e)=>{
        this.setState({texts: e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const {setMessages} = this.props
        setMessages(this.state.texts)
        this.setState({texts: " "})
    }

    render(){
        const {texts, isPopoverOpen} = this.state
        return(
            <div className="message-input">
            
                    <form
                    className="message-form"
                    onSubmit={this.handleSubmit}
                    >
                    <Popover
                    isOpen={isPopoverOpen}
                    padding={10}
                    className="chat-invite-message-form"
                    onClickOutside={this.TogglePopover}
                    content={({position, nedgedLeft, nudgedTop, targetRect, popoverRect})=>(
                            <div className="image-upload">
                                  <input type="file" className="send-pics" placeholder="Send file" onChange={this.handleFile}/>
                            </div>
                    )}
                     
                    >
                    <button className="open-images"
                    onclick={this.TogglePopover}><img src="cutie.jpg" className="image" alt=""/></button>
                    </Popover>
                    <input 
                        id="message"
                        type="text"
                        className="form-control"
                        onChange={this.handleChange} 
                        autoComplete="on"
                        autoFocus="on"
                        value={texts}
                        placeholder= "Type Something Interesting"
                        
                        />  
                        <button 
                            disabled={texts.length < 1}
                            type="submit"
                            className="send"
                            >Send</button>                  
                    </form>
                    
                    </div>
        )
    }
}
export default Input