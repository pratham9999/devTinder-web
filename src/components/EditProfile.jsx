
export default function EditProfile() {
  return (
    <div>  

<div className="flex min-h-screen justify-center items-center">


<div className="card bg-base-100 w-96 shadow-xl">
<div className="flex font-bold text-2xl justify-center items-center">DevTinder</div>
  <figure className="px-10 pt-10">
    <img
      src=""
      alt="Login Page"
      className="rounded-xl w-60" />
  </figure>
  <div className="card-body items-center text-center">

    <div className="-mt-2">
         <div className="p-1 w-72">
         <input 
          placeholder="Firstname" 
          className="p-2 px-2 w-full border border-black "/>
          </div>

         <div className="p-1 w-72">
          <input 
          className="p-2 px-2 w-full border border-black"/>
          </div>
          <div className="p-1 w-72">
          <input 
          className="p-2 px-2 w-full border border-black"/>
          </div>
          <div className="p-1 w-72">
          <input 
          className="p-2 px-2 w-full border border-black"/>
          </div>
    </div> 
    <div className="card-actions">
      <button className="btn btn-primary bg-lime-300">Signup</button>
    </div>
  </div>
</div>
    </div>  
    </div>
  )
}
