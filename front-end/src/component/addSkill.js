import React, { useState } from "react";
import { useHistory } from 'react-router-dom'


function AddSkill(){
    const[skill,setSkill] = useState("")
    const history = useHistory()
  
  
    const handleSkill = (e) => {
        e.preventDefault()
        const { token } = JSON.parse(sessionStorage.getItem('token'))
        const bearerToken =`Bearer ${token}`
        console.log(bearerToken);
        const data = { skill  }
        const requestOptions = {
          method: 'PUT',
          mode: 'cors',
          headers: { 
            'Authorization': bearerToken, 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           },
          body: JSON.stringify(data)
        };
        fetch('http://localhost:4444/skills', requestOptions)
          .then(response => {
            response.json()
          console.log('res',response);
           history.push("/")
          })
          .then(data => console.log(data));

        }

    return (
        <>
        <input onChange={(e)=> setSkill(e.target.value)}></input>
        <button onClick={handleSkill}>Add</button>
        </>
    )
}

export default AddSkill