// import React, { useState } from 'react'
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   const [ firstName, setFname ] = useState('')
//   const [ lastName, setLname ] = useState('')
//   const [ userName, setUname ] = useState('')
//   const [ password, setPass ] = useState('')
//   console.log(firstName)

//   const onRegister = (e) => {
//     e.preventDefault()
//     const data = { firstName, lastName, userName, password  }
//     console.log(data);
//     const requestOptions = {
//       method: 'POST',
//       mode: 'cors',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//        },
//       body: JSON.stringify(data)
//     };
//     fetch('http://localhost:4444/signup', requestOptions)
//       .then(response => {
//         response.json()
//       console.log('res',response);
//       })
//       .then(data => console.log(data));

//     // empty dependency array means this effect will only run once (like componentDidMount in classNamees)
// }
//   return (
// <form>
//   <input placeholder='First name' onChange={(e) => setFname(e.target.value)} />
//   <input placeholder='Last name' onChange={(e) => setLname(e.target.value)}/>
//   <input placeholder='Username' onChange={(e) => setUname(e.target.value)}/>
//   <input placeholder='Password' onChange={(e) => setPass(e.target.value)}/>
//   <button type='submit' onClick={ onRegister }>Submit</button>
// </form>
//   )
// }

// export default App;

import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import './App.css'
import Login from "./component/login";
import Navbar from "./component/Navbar";          
import Signup from './component/Signup'
import Home from "./component/Home";
import Contact from "./component/Contact";
import AddSkill from './component/addSkill'
import UserInfo from './component/user-Info';
import GiveReview from "./component/giveReview";


function App() {
  return (
   <>
   {/* <Navbar/> */}
<Provider store={ store }>
<Router>
<Navbar/>

<Route exact path="/">
   <Home/>
   </Route>

   <Route path="/login">
   <Login/>
   </Route>

   <Route path="/signup">
   <Signup/>
   </Route>

   <Route path="/contact">
   <Contact/>
   </Route>

   <Route path="/add-skill">
   <AddSkill />
   </Route>

   {/* <Route path="/UserInfo">
   <UserInfo />
   </Route> */}

   <Route
  path='/UserInfo'
  render={(props) => (
    <UserInfo {...props} />
  )}
/>
  <Route path="/giveReview">
   <GiveReview />
   </Route>

</Router>
</Provider>
   </>
  )
}

export default App