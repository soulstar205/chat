import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Join from './component/join/join'
import Chat from './component/chat/chat'
import Layout from './component/layout';

const App=()=>{
    return(
      <div>
          <Layout/>
      </div>
    )
   
}
export default App;