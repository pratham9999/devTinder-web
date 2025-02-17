/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/Constant';
import { removeUserFromFeed } from '../utils/feedSlice';

export default function UserCard({user}) {
const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
const dispatch= useDispatch();

const handleSendRequest=async (status , userId)=>{
      try {

         const res = await axios.post(BASE_URL+status+"/" + userId , {} , {withCredentials : true ,})
         dispatch(removeUserFromFeed(userId))
        
      } catch (error) {
        console.log(error);
        
      }

}



  return (
    <div><div className="card border-lime-300 bg-slate-100 rounded-lg w-96 shadow-xl">
    <figure className="px-10 pt-10">
      <img
        src={user.photoUrl}
        alt="photo"
        className="w-64" />
    </figure>
    <div className="card-body items-center text-center ">
      <h2 className="card-title font-bold">{firstName+" "+lastName}</h2>
        {age && gender &&<p>{age +" "+gender}</p>}
         <p className='font-style: italic'>{about}</p>
      <div className=" pt-3 w-64 card-actions flex justify-between">
        <button onClick={handleSendRequest("ignored" , _id)} className="btn btn-primary px-5 flex  bg-red-100">Ignore</button>
        <button onClick={handleSendRequest("interested" , _id)} className="btn btn-primary bg-lime-300">intrested</button>
      </div>
    </div>
  </div></div>
  )
}
