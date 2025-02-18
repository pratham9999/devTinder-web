/* eslint-disable react/prop-types */
import { useState } from "react"
import UserCard from "./UserCard"
import axios from "axios"
import { BASE_URL } from "../utils/Constant"
import { useDispatch } from "react-redux"
import {addUser} from "../utils/userSlice.js"

export default function EditProfile({user}) {
  const [firstName , setFirstName] = useState(user.firstName)
  const [lastName , setlastName] = useState(user.lastName)
  const [age , setAge] = useState(user.age || "")
  const [gender , setGender] = useState(user.gender || "")
  const [about , setAbout] = useState(user.about || "")
  const [photoUrl , setPhotoUrl] = useState(user.photoUrl || "")
  const [error , setError] = useState("")
  const dispatch = useDispatch()
  const [showToast , setShowToast] = useState(false);

 const handleEdit = async ()=>{
    setError("")

    try {

      const res = await axios.patch(BASE_URL+ "/profile/edit" , {
           firstName ,lastName , photoUrl , age , gender , about
      } , {withCredentials : true,})

      dispatch(addUser(res?.data?.data))
    setShowToast(true)
      setTimeout(()=>{
      setShowToast(false)
    } , 3000)
      
      
    } catch (error) {
      setError(error.response.data);
      
       console.log(error);
       
    }
     
 }  

  return (
    <div className="  flex min-h-screen  justify-center items-center gap-6   ">  

<div className="flex border border-black mx-4 p-8 shadow-xl gap-6 items-start rounded-lg">


<div className="card bg-base-100 w-96 flex   ">
<div className="flex font-bold text-2xl justify-center items-center">Edit Profile</div>
  {/* <figure className="px-10 pt-10">
    <img
      src={user.photoUrl}
      alt="Login Page"
      className="rounded-xl w-32" />
  </figure> */}
  <div className="card-body items-center text-center flex-grow">

    <div className="-mt-2">
         <div className="p-1 w-72">
         <input 
         value={firstName}
         onChange={(e)=> {
            setFirstName(e.target.value)
         }}
          placeholder="Firstname" 
          className="p-2 px-2 w-full border border-black "/>
          </div>

         <div className="p-1 w-72">
          <input 
          value={lastName}
         onChange={(e)=> {
            setlastName(e.target.value)
         }}
          placeholder="lastName"
          className="p-2 px-2 w-full border border-black"/>
          </div>
          <div className="w-72 flex">
          <div className="p-1 ">
          <input 
          value={age}
         onChange={(e)=> {
            setAge(e.target.value)
         }}
          placeholder="age"
          className="p-2 px-2 w-full border border-black"/>
          </div>
          <div className="p-1 ">
          <input 
          value={gender}
         onChange={(e)=> {
            setGender(e.target.value)
         }}
          placeholder="gender"
          className="p-2 px-2 w-full border border-black"/>
          </div>
          </div>
          <div className="p-1 w-72">
           <input 
           value={about}
         onChange={(e)=> {
            setAbout(e.target.value)
         }}className="p-2 px-2 w-full border border-black" placeholder="about"/>

          </div>
          <div className="p-1 w-72">
           <input
           value={photoUrl}
         onChange={(e)=> {
            setPhotoUrl(e.target.value)
         }} className="p-2 px-2 w-full border border-black" placeholder="photoUrl"/>

          </div>
    </div> 
     <p className="font-bold min-h-[40px] text-red-500" >{error || ""}</p>
    <div className="card-actions">
      <button onClick={handleEdit} className="btn btn-primary bg-lime-300">Save</button>
    </div>
  </div>
</div>
    </div>
     <div className=" card bg-base-100 border border-black w-96 flex flex-col shadow-md rounded-lg ">
    <UserCard user={{firstName , lastName , photoUrl , age , gender , about}}/>
    </div>
    {showToast && (<div className="toast toast-top toast-center">
  <div className="alert alert-success bg-lime-200">
    <span>Profile has been updated SuccesFully</span>
  </div>
</div>)}
    </div>
  )
}
