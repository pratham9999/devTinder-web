/* eslint-disable react/jsx-key */
import axios  from "axios"
import { BASE_URL } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";

export default function Connections() {
  const connections = useSelector((store) => store.connections)
  const Navigate = useNavigate()
     const dispatch = useDispatch();

    const fetchConnections = async ()=> {

        try {
              
             
             const res = await axios.get(BASE_URL + "/user/connections" , {
                withCredentials : true,
             })
             console.log(res.data.data);
               dispatch(addConnections(res.data.data))
            
        } catch (error) {
             console.log(error);
             
        } 

    }

    useEffect(()=>{
    
         fetchConnections()

    } , [])


    if(!connections) return ;

    if(connections.length === 0) return <h1>No connections found !!</h1>

  return (
    <div className="main-content text-center my-10 ">
      <h1 className="font-bold text-3xl">Connections</h1>

       {connections.map((connection)=>{
         const {_id , firstName , lastName , photoUrl ,age , gender , about } = connection

           return (
          <div key={_id} className=" flex justify-between m-4 p-4 gap-4 border border-black rounded-lg bg-base-300 w-1/3 mx-auto">
             <div><img alt="photo" className="w-20 h-20 rounded-full object-cover " src={photoUrl}/></div>
             <div className="text-left mx-4">
             <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
             {age && gender && <p>{age + ", " + gender}</p>}
              <p className="italic">{about}</p>
             </div>
              <div className=" flex items-center ">
              <button onClick={()=>{
                 Navigate(`/chat/${_id}`)
              }} className="bg-lime-200 rounded-btn px-5 py-2">Chat</button>
              </div>
          </div>  
           )
       })}

    </div>
  )
}
