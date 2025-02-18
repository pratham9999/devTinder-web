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

         const res = await axios.post(BASE_URL+ "/request/send/" + status + "/" + userId , {} , {withCredentials : true ,})
         dispatch(removeUserFromFeed(userId))
        
      } catch (error) {
        console.log(error);
        
      }

}



  return (
    <div className='max-w-full'><div className="card border-lime-300 bg-slate-100 rounded-lg w-96 shadow-xl">
    <figure className="px-10 pt-11">
      <img
        src={user.photoUrl || "https://imgs.search.brave.com/CHgFMrQz5fFweB_PL1BwkHBcgIcntjkj_vykLk0fzMI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnNz/dGF0aWMubmV0L0hR/d0hJLmpwZw"}
        alt="photo"
        className="w-64 h-64" />
    </figure>
    <div className="card-body items-center text-center ">
     <div className=' min-h-[26px] max-h-[-40px] overflow-hidden text-ellipsis truncate flex justify-center'> <h2 className="card-title font-bold pr-1">{firstName+" "+lastName}</h2> {age && gender &&<p className=' pt-1 font-style: italic'>{"," + " "+ age +" "+gender}</p>}</div>
        
         <p className='w-full italic min-h-[40px] max-h-[80px] overflow-hidden text-ellipsis truncate'>{about}</p>
      <div className=" pt-3 w-64 card-actions flex justify-between">
        <button onClick={()=>{handleSendRequest("ignored" , _id)}} className="btn btn-primary px-5 flex  bg-red-100">Ignore</button>
        <button onClick={()=>{handleSendRequest("interested" , _id)}} className="btn btn-primary bg-lime-300">intrested</button>
      </div>
    </div>
  </div></div>
  )
}
