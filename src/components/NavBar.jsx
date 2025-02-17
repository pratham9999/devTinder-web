import { useSelector } from "react-redux"

export default function NavBar() {
  const user = useSelector((store) => store.user)
  console.log(user);
  
  return (
    <div>
    {user && <div className="navbar bg-slate-200">
<div className="flex-1">
  <a className="btn btn-ghost text-xl text-black font-bold " >⚡DevTinder</a>
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
      <li>
        <a className="justify-between">
          Profile
          <span className="badge">New</span>
        </a>
      </li>
      <li><a>Settings</a></li>
      <li><a>Logout</a></li>
    </ul>
  </div>
</div>
</div>}
  </div>
  )
}
