/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const {id} = useParams();
    const [messages , setMessages] = useState([])
    const [newMessage , setNewMessage] = useState();
    const user = useSelector((store) => store.user)
    const connections = useSelector((store)=> store.connections) || []
    const userId = user?._id
    
    // Get the connection's firstName using the id from params
    const connectionDetails = connections.find(connection => connection?._id === id);
    const connectionFirstName = connectionDetails?.firstName;
      
    useEffect(()=>{

     
      

      if(!userId) {
        return
      }

      

      const socket = createSocketConnection()
      socket.emit("joinChat" , {firstName : user.firstName , userId , id})
      socket.on("messageReceived" , ({firstName , text})=>{
          console.log(firstName , text);
          setMessages((messages) => [...messages , {firstName , text}])
      })

      return ()=>{
        socket.disconnect();
      }

    } , [userId , id])

    const sendMessage = ()=>{

      const socket = createSocketConnection()

      socket.emit("sendMessage" , {firstName : user.firstName , userId , id , text : newMessage})
      newMessage("")

    }
      

  return (
    <div className="w-3/4 mx-auto  border border-gray-200 my-5 h-[80vh] flex flex-col mb-20 ">

       <h1 className=" border-b border-gray-200 flex px-6 py-5 font-bold text-2xl ">Chat with {connectionFirstName}</h1>
       
        
        <div className="  flex-1 overflow-y-scroll p-5">
             {/* display messages*/}
             {messages.map((msg , index)=>{
                  return(
                    
                    <div key={index} className= " flex flex-col chat chat-start">
                     
  <div className="chat-heade">
    {msg.firstName}
  
    <time className="text-xs opacity-50 p-1">2 hours ago</time>
  </div>
  <div className="bg-gray-200 p-1 rounded shadow-lg">
  <div className="chat-bubble">{msg.text}</div>
  </div>
</div>

                  )
             })}
        </div>

        <div className="flex border-t border-gray-200 p-5 items-center gap-2">
             <input 
             onChange={(e)=>{
              setNewMessage(e.target.value)
             }} value={newMessage} placeholder="Type a message..." className="flex-1 border border-gray-300  rounded p-1"></input>
             
             <button onClick={sendMessage} className="bg-lime-200 p-2 hover:bg-lime-400  rounded-xl border border-black ">Send</button>
             
        </div>
      
    </div>
  )
}
