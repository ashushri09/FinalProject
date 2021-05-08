import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux' 
import { withRouter } from "react-router";
import { saveSkilledData } from "./../redux/home"
import "../css/home.css";
import UserInfo from "./user-Info"


function Home(props) {

    const [search , setSearch] = useState("")
    const [ skilledData, setSkilledData ] = useState('')
    const [ userData, setShowUserInfo ] = useState(null)
    const dispatch = useDispatch()
console.log(skilledData);
    const getData = (e) =>{
        const url = `http://localhost:4444/skilled-man/${search}`
        e.preventDefault()
        fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setSkilledData(data)
        })
 
        .catch((err)=>{
            console.log(err);
        })
    }

    function getUser(user){
        console.log(user);
        setShowUserInfo(user)

        dispatch(saveSkilledData(user))
        props.history.push('/UserInfo');
    //   return ( <userInfo 
    //     name = {user.userName}
    //     email = {user.email} 
    //      />)
    }


    return (

        <>
            <header>
                <div className="wrapper">
                    <div className="logo">
                        <img src="https://i.postimg.cc/mg4rWBmv/logo.png" alt="" />
                    </div>
                </div>
                <div className="search-box">
                    <input className="search-txt" type="text" 
                    onChange={(e)=> setSearch(e.target.value)} name="" placeholder="Type to search" />
                    <a className="search-btn" onClick = {getData} href="/"><div class="icon"><i className="fa fa-search" aria-hidden="true"></i></div></a>
                </div>
                <React.Fragment>
                {!skilledData ?(
                    <React.Fragment>
                <div className="welcome-text">
                    <h1>
                        We are <span>Creative</span></h1>
                    <a href="/Contact">Contact Us</a>
                </div>

                </React.Fragment>
                ):(
                    <div>
                {!userData && skilledData?.map((user)=>(
                     <div>
                         <div onClick={() => getUser(user)}  className="text-white">{user?.userName}
                         </div>
                    </div>
                ))}
{userData && (<UserInfo 
        name = {userData.userName}
        email = {userData.email} 
         />)}
                    </div>


                )}
                </React.Fragment>
            </header>
        </>
    )
}
export default withRouter(Home)


