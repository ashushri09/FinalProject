import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from 'react-redux' 
import { useHistory, Link } from 'react-router-dom'
import "../css/userInfo.css"

function UserInfo(props){
    const { token: userToken } = useSelector(state => state.home)
    const [ isLoggedIn, setIsLoggedIn] = useState(false)
    const history = useHistory();
    const { skilledUser } = useSelector(state => state.home)
    const [review,setReview] = useState("")
    const [Booking,setBooking] = useState(false)
  
    // console.log(token);
    const onBookingClick = () => {
        if (isLoggedIn) {
           setBooking(true)
        } else {
        history.push('/login')
        }
        }
  
    useEffect(() => {
      // console.log('toekn',token);
      const { token } = JSON.parse(sessionStorage.getItem('token')) || []
      if(token ) setIsLoggedIn(true)
    }, [ userToken ])
    



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
        <div className="userInfoBg">
        <div className="userInfoBox">

            <div className="userTable">
            <div className=''>name = {skilledUser.userName}</div>
            <div className=''>email = {skilledUser.email}</div>
            <div className=''>mobile = {skilledUser.mobile}</div>
            
            {!review?.length ? (<button className="showReviewBtn" onClick={(e) => getReview(e)} type='button'>show review</button>) : (
                review && review.map((rew, inx) => (
                    <div>{`${inx + 1}. `}{ rew?.reviewMsg}</div>
                ))
            )}
            </div>

<div className="reviewButtons">
            <Link className="linkClass" to="/giveReview">Give Review</Link>
            <button onClick={onBookingClick}>Book People</button> 
            </div>

            {isLoggedIn && Booking && (
                <div className="modal d-block" tabindex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Booked</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ () => setBooking(false)}>
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                succesfully Booked!
                                </div>
                                <div className="modal-footer">
                                {/* <button type="button" className="btn btn-primary" onClick={(e) => handleRegisterClick(e)}>Register</button> */}
                                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">OK</button> */}
                                <Link to="/" type="button" className="btn btn-secondary">Ok</Link>
                                </div>
                             </div>
                        </div>
                      </div>
                      </div>
            )}
        </div>
        </div>
    )
}

export default UserInfo;