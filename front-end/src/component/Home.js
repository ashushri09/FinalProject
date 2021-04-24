import React from "react";
import "./home.css";


function Home(){
    return (

        <>
         <header>
    <div className="wrapper">
        <div className="logo">
            <img src="https://i.postimg.cc/mg4rWBmv/logo.png" alt=""/>
        </div>

</div>
<div className="welcome-text">
        <h1>
We are <span>Creative</span></h1>
<a href="/Contact">Contact Us</a>
    </div>
    {/* <label> htmlFor="search" Search by name</label>  */}
    {/* <div class="icon"><i class="fa fa-search" aria-hidden="true"></i></div> */}
    {/* <input className="search-box"id="input" type="search" autocomplete="off" spellcheck="false" placeholder="Search.." aria-live="polite"/> */}
    <div className="search-box">
        <input className="search-txt" type="text" name="" placeholder="Type to search"/>
            <a className="search-btn" href="#"><div class="icon"><i class="fa fa-search" aria-hidden="true"></i></div></a>


    </div>
</header>
        </>
    )
}
export default Home