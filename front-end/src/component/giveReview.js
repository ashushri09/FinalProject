import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

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
          history.push("/")
          })
          .then(data => console.log(data));

        }



    return(
        <>
        <input onChange={(e) => setMsg(e.target.value)}></input>
        <input onChange={(e) => setName(e.target.value)}></input>
        <button onClick={setReview}> Add </button>
        </>
    )
}

export default GiveUserReview;