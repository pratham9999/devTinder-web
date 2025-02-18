import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";
import { removeUser } from "../utils/userSlice";

export default function NavBar() {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const Navigate = useNavigate()
 
   const handleLogout = async ()=>{
     try {

        await axios.post(BASE_URL+"/logout" , {} , {
        withCredentials : true,
      })
        
      dispatch(removeUser())
      Navigate("/login")

      
     } catch (error) {
         console.log(error);
         
     }
   }
  return (
    <div>
    {user && <div className="navbar bg-slate-200">
<div className="flex-1">
  <Link to={"/"} className="btn btn-ghost text-xl text-black font-bold " >⚡DevTinder</Link>
</div>
<div className="flex-none gap-2">
 <div>Welcome , {user.firstName}</div>
  <div className=" flex dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img
          alt="user photo"
          src= {user.photoUrl}/>
      </div>
    </div>
    {/* <p className="p-1 flex items-center">Welcome, {user.firstName}</p> */}

   
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-slate-200 rounded-box z-[1] mt-12 w-52 p-2 shadow">
      <li className="hover:bg-slate-300">
        <Link to="/profile" className="justify-between">
          Profile
        </Link>
      </li>
      <li className="hover:bg-slate-300"><Link to= "/connections">Connections</Link></li>
      <li className="hover:bg-slate-300"><Link to="/requests">Requests</Link></li>
      <li className="hover:bg-slate-300"><a onClick={handleLogout} >Logout</a></li>
    </ul>
  </div>
</div>
</div>}
  </div>
  )
}
