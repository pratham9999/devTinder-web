/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";

export default function Chat() {
    const {id} = useParams();
    const [messages , setMessages] = useState([])
    const [newMessage , setNewMessage] = useState();
    const user = useSelector((store) => store.user)
    // const connections = useSelector((store)=> store.connections) || []
    const userId = user?._id
    
    // Get the connection's firstName using the id from params
    // const connectionDetails = connections.find(connection => connection?._id === id);
    // const connectionFirstName = connectionDetails?.firstName;

    
    const fetchChatMessages = async ()=>{

      const chat = await axios.get(BASE_URL +"/chat/"+ id ,{
        withCredentials : true,
      })

      console.log(chat.data.messages);

      const chatMessages =  chat?.data?.messages.map((msg)=>{
           const {senderId , text} = msg ;
           return {
              firstName : senderId?.firstName,
              text ,
           }

      })

      setMessages(chatMessages)
      
    }
      
   
    useEffect(()=>{
      fetchChatMessages()

    } , [])

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
      setNewMessage(" ")
    }
      

  return (
    <div className="w-3/4 mx-auto  border border-gray-200 my-5 h-[80vh] flex flex-col mb-20 ">

       <h1 className=" border-b border-gray-200 flex px-6 py-5 font-bold text-2xl ">Chat</h1>
       
        
        <div className=" scroll-smooth md:scroll-auto  flex-1 overflow-y-scroll p-5">
             {/* display messages*/}
             {messages.map((msg , index)=>{
              const isSender = user.firstName === msg.firstName;
                  return(
                    
                    <div key={index} className= {` flex flex-col chat ${isSender ? "chat-end" : "chat-start"}`}>
                     
  <div className="chat-header">
    {msg.firstName}
  
  </div>
  <div className={` ${isSender ? "bg-lime-300 rounded-l-xl" : "bg-gray-200 rounded-r-xl" } p-1  shadow-lg`}>
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
