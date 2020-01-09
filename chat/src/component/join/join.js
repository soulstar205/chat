import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './join.css'

const Join=()=>{
    const [name, setName] = useState('')

    return(
        <div className="joinOuterContainer">
            <div className="JoinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Enter Your Username" 
                className="joinInput" 
                type="text" 
                onChange={(e)=> setName(e.target.value)}/></div>
                <Link onClick={e=>(!name)? e.preventDefault(): null} to={`/chat? name=${name}`}>
                    <button className="button" type="submit">Sign in</button>
                </Link>
            </div>
        </div>
    )
}
export default Join