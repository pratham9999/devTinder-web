/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

export default function Feed() {
  const feed = useSelector((store)=>store.feed)
  const dispatch = useDispatch();

  const getFeed = async ()=>{
    if(feed) return ;
       try {
       const res = await axios.get(BASE_URL + "/feed", {
          withCredentials : true,
        })
        console.log(res.data.data);
        dispatch(addFeed(res?.data?.data))

        
       } catch (error) {
          console.log(error);
          
       }
  }

  useEffect(()=>{
    getFeed();
  } , [])
   
  if(!feed) return; 

  if(feed.length <=0 )
    return <h1>No new users Founds!</h1>

  return (
       feed && (
         <div className='flex justify-center pt-20 '><UserCard user={feed[0]}/></div>
       )
  )
}
