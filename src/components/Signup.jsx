import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";

export default function Signup() {
  const emailIdRef = useRef(null)
  const passwordRef = useRef(null)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const[currentFocus , setCurrentFocus] = useState("emailId")
  const [password , setPassword] = useState("")
  const [emailId , setemailId]= useState("")
  const [hideBearImgs , setHideBearImgs] = useState([])
  const [watchBearImgs , setWatchBearImgs] = useState([])
  const [currentBearImg , setCurrentBearImg] = useState(null)
  const [firstName , setFirstName] = useState("")
  const [lastName , setLastName] = useState("")
  const [error , setError] = useState("")
  const Navigate = useNavigate()

  const handleSignup = async ()=>{

     try {
      const res = await axios.post( BASE_URL+"/signup" , {
        firstName ,
        lastName,
        emailId,
        password,
   } , {withCredentials : true})
     console.log(res.data);
     
      
     } catch (error) {
       setError(error.message)
        console.log(error);
        
     }
  }


  useEffect(()=>{
    
    const loadImages= (glob , setState)=>{
         setState(
            Object.values(glob)
            .map((asset)=>asset.default)
            .sort((a,b)=>
              (parseInt(a.match(/(\d+)-.*\.png$/)?.[1] || "0") - parseInt(b.match(/(\d+)-.*\.png$/)?.[1] || "0"))
            )
         )
    };

    loadImages(import.meta.glob("../assets/img/watch_bear_*.png" , {eager:true}) , setWatchBearImgs);
    loadImages(import.meta.glob("../assets/img/hide_bear_*.png" , {eager:true}) , setHideBearImgs);



  } , [])


  useEffect(()=>{

     
     
    if(currentFocus==="emailId"){
       const index=Math.min(Math.floor(((emailId.length * 8) / 400) * watchBearImgs.length - 1), watchBearImgs.length - 1)
       
       
       setCurrentBearImg(watchBearImgs[index])
       
    }
    if(currentFocus==="FIRSTNAME"){
        const index=Math.min(Math.floor(((firstName.length * 8) / 400) * watchBearImgs.length - 1), watchBearImgs.length - 1)
        
        
        setCurrentBearImg(watchBearImgs[index])
        
     }

     if(currentFocus==="LASTNAME"){
        const index=Math.min(Math.floor(((lastName.length * 8) / 400) * watchBearImgs.length - 1), watchBearImgs.length - 1)
        
        
        setCurrentBearImg(watchBearImgs[index])
        
     }
    else if (currentFocus==="PASSWORD"){
      hideBearImgs.forEach((img, index) => setTimeout(() => setCurrentBearImg(img), index * 50));

    }

  } ,  [currentFocus ,hideBearImgs , watchBearImgs , emailId.length , firstName.length , lastName.length] )


  

  return (
    <div className="flex min-h-screen justify-center items-center">


<div className="card bg-base-100 w-96 shadow-xl">
<div className="flex font-bold text-2xl justify-center items-center">DevTinder</div>
  <figure className="px-10 pt-10">
    <img
      src={currentBearImg ?? watchBearImgs[0]}
      alt="Login Page"
      className="rounded-xl w-60" />
  </figure>
  <div className="card-body items-center text-center">

    <div className="-mt-2">
         <div className="p-1 w-72">
         <input 
         value={firstName}
         onFocus={()=>{
          setCurrentFocus("FIRSTNAME")
         }}
         onChange={(e)=>{
           setFirstName(e.target.value)
         }}
         ref={firstNameRef}
          placeholder="Firstname" 
          className="p-2 px-2 w-full border border-black "/>
          </div>

         <div className="p-1 w-72">
          <input 
          value={lastName}
          onFocus={()=> setCurrentFocus("LASTNAME")}
          placeholder="Lastname" 
          onChange={(e)=>{
           setLastName(e.target.value)
          }}
          ref={lastNameRef}
          className="p-2 px-2 w-full border border-black"/>
          </div>
          <div className="p-1 w-72">
          <input 
           value={emailId}
          onFocus={()=> setCurrentFocus("emailId")}
          placeholder="Email" 
          onChange={(e)=>{
           setemailId(e.target.value)
          }}
          ref={emailIdRef}
          className="p-2 px-2 w-full border border-black"/>
          </div>
          <div className="p-1 w-72">
          <input 
          value={password}
          onFocus={()=> setCurrentFocus("PASSWORD")}
          placeholder="Password" 
          onChange={(e)=>{
           setPassword(e.target.value)
          }}
          ref={passwordRef}
          className="p-2 px-2 w-full border border-black"/>
          </div>
    </div> 
    <div className="w-full flex justify-start">{error}</div>
    <div className="card-actions">
      <button onClick={handleSignup} className="btn btn-primary bg-lime-300">Signup</button>
    </div>
    <div className=" w-full p-2 font-bold flex justify-end">Already user?<div onClick={()=>{
      Navigate("/Login")
    }} className="pl-1 cursor-pointer">Login</div></div>
  </div>
</div>
     

     
    </div>
  )
}
