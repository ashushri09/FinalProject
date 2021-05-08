import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import "../css/skill.css"

function AddSkill() {
  const [skill, setSkill] = useState("")
  const history = useHistory()


  const handleSkill = (e) => {
    e.preventDefault()
    const { token } = JSON.parse(sessionStorage.getItem('token'))
    const bearerToken = `Bearer ${token}`
    console.log(bearerToken);
    const data = { skill }
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
        console.log('res', response);
        history.push("/")
      })
      .then(data => console.log(data));

  }

  return (
        <>

      <div className="skillForm">
        <form>

          <h1>Add Skill</h1>


          <legend><span className="number">1</span>Your info</legend>
          <label for="name">Name:</label>
          <input type="text" id="name" name="user_name" />

          <label for="mail">Email:</label>
          <input type="email" id="mail" name="user_email" />

          <label for="password">Password:</label>
          <input type="password" id="password" name="user_password" />

          <label>Age:</label>
          <input type="radio" id="under_13" value="under_13" name="user_age" /><label for="under_13" className="light">Under 18</label><br />
          <input type="radio" id="over_13" value="over_13" name="user_age" /><label for="over_13" className="light">18 or older</label>
       

     <label>Interests:</label>

        <input type="text" id="name" name="user_name" onChange={(e) => setSkill(e.target.value)}></input>
        <button onClick={handleSkill}> Get in Touch </button>
        </form>
      </div>
        
    </>
    )
}

export default AddSkill ;