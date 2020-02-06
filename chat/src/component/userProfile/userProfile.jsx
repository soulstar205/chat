import React from 'react'
import Header from '../customNavbar/navBar'
import './userProfile.css'


class UserProfile extends React.Component{
    constructor(){
        super()
        this.state={
            file1: ''
        }
    }

    handleFile=(e)=>{
        e.preventDefault()
        this.setState({
            file1: URL.createObjectURL(e.target.files[0])
        })
    }

    render(){
        return(
            <div>
            <Header/>
            <div className="user-profile-container">
            <div className="user-photo-bio">
            <div className="user-profile-image">
                <img style={{width: '350px', height:'350px'}} src={this.state.file1} alt=""/>
                   
                   {  
                      this.state.file1 && (
                         <button
                            style={{width: '110px', height:'30px', background: 'red'}} 
                            onClick={this.ResetFile1}></button>
                      )
                    }
                     <input className="input" type="file" placeholder="Upload a picture" onChange={this.handleFile}/>
            </div> 
            <div className="bio">
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="" >About Me</label>
                <textarea name="about me" id="" cols="30" rows="10" className="bio-textarea"></textarea>
                <button type="submit" style={{width: '70px', height:'30px', background: 'green', borderRadius: "5px"}} 
                            >>Submit</button>
            </form>
            </div>

            </div>
            
            </div>
            </div>
        )
    }
}
export default UserProfile