import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/Constant.js'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice.js'
import { useEffect } from 'react'

export default function Body() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const userData = useSelector((store)=> store.user)
  const fetchUser = async ()=>{
    if(userData) return
      try {
        const res = await axios.get(BASE_URL+"/profile/view", {
          withCredentials : true,
        })
       
        dispatch(addUser(res.data))

        
      } catch (error) {
        if(error.status===401){
          Navigate("/login")
        }
         console.error(error);
         
      }
  };


  useEffect(()=>{
   
      fetchUser();
    
    
  } ,[])
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
