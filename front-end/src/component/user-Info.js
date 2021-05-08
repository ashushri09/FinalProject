import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux' 
import { useHistory, Link } from 'react-router-dom'
function UserInfo(props){
    const { skilledUser } = useSelector(state => state.home)
    const [review,setReview] = useState("")
    const getReview = (e) =>{
        console.log(e);
        const url = `http://localhost:4444/review-man/${skilledUser._id}`
        console.log(skilledUser._id);
        e.preventDefault()
        fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setReview(data)
        })
 
        .catch((err)=>{
            console.log(err);
        })
    }
    console.log(props);
console.log('user', skilledUser);
    return (
        <>
            <div className=''>name = {skilledUser.userName}</div>
            <div className=''>email = {skilledUser.email}</div>
            <div className=''>mobile = {skilledUser.mobile}</div>
            {!review?.length ? (<button onClick={(e) => getReview(e)} type='button'>show review</button>) : (
                review && review.map((rew, inx) => (
                    <div>{`${inx + 1}. `}{ rew?.reviewMsg}</div>
                ))
            )}
            <Link to="/giveReview">Give Review</Link>
        </>
    )
}

export default UserInfo;