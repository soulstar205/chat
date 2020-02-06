import React from 'react'
import {Link} from 'react-router-dom'
import './join.css'



class Join extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange=(e)=>{
        this.setState({name: e.target.value})
        
    }
    handleSubmit=(e)=>{
        const {name} = this.state
        this.props.setUser(name)
        alert(name)
    }
    
    render(){
        const {name} = this.state
        return(
            <div className="joinOuterContainer">
                <div className="JoinInnerContainer">
                    <h1 className="heading">Join</h1>   
                    <div>   
                        <input placeholder="Enter Your Username" 
                    className="joinInput" 
                    type="text" 
                    autoFocus="on"
                    value={name}
                    onChange={this.handleChange}/>
                    </div>  
                    <Link onClick={(e)=>(!name)? e.preventDefault: this.handleChange} to={`/chat?`}>
                        <button 
                        className="button" type="submit">Sign in</button>  
                    </Link>        
                </div>
            </div>
        )
    }  
}
export default Join