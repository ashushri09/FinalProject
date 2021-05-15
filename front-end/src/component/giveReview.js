import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import '../css/skill.css'

function GiveUserReview(){
    const [msg,setMsg] = useState("")
    const [name,setName] = useState("")
    const { skilledUser } = useSelector(state => state.home)
    console.log(skilledUser);
    const history = useHistory()
    const setReview = (e) => {
        e.preventDefault()
        console.log(skilledUser);
        const data = { userId:skilledUser._id , name ,reviewMsg:msg  }
        const { token } = JSON.parse(sessionStorage.getItem('token'))
        const bearerToken =`Bearer ${token}`
        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: { 
            'Authorization': bearerToken, 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           },
          body: JSON.stringify(data)
        };
        fetch('http://localhost:4444/review', requestOptions)
          .then(response => {
            response.json()
          console.log('res',response);
          history.push("/UserInfo")
          })
          .then(data => console.log(data));

        }



    return(
      <div className="userInfoBg">
        {/* <div >
        <input onChange={(e) => setMsg(e.target.value)}></input>
        <input onChange={(e) => setName(e.target.value)}></input>
        <button onClick={setReview} className="btn btn-primary btn-sm"> Add </button>
        </div> */}

<div className="skillForm">
<form>
   
  <h1>Give Review</h1>


  {/* <legend><span className="number">1</span>Your info</legend>
  <label for="name">Name:</label>
  <input type="text" id="name" name="user_name" />

  <label for="mail">Email:</label>
  <input type="email" id="mail" name="user_email" />

  <label for="password">Password:</label>
  <input type="password" id="password" name="user_password" />

  <label>Age:</label>
  <input type="radio" id="under_13" value="under_13" name="user_age" /><label for="under_13" className="light">Under 18</label><br />
  <input type="radio" id="over_13" value="over_13" name="user_age" /><label for="over_13" className="light">18 or older</label>
 */}

<label for="name">Name:</label>
  <input type="text" id="name" name="user_name" onChange={(e) => setName(e.target.value)}></input>

        <label for="msg">Review:</label>
        <input type="text" id="msg" name="msg" onChange={(e) => setMsg(e.target.value)}></input>
        <button onClick={setReview} className="btn btn-primary btn-sm"> Add </button>
      
</form>
</div>
</div>
    )
}

export default GiveUserReview;