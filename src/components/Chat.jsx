import { useState } from "react";
import { useParams } from "react-router-dom"

export default function Chat() {
    const {id} = useParams();
    const [messages , setMessages] = useState([{text : "Hello world"}])
  return (
    <div className="w-1/2 mx-auto  border border-gray-200 my-5 h-[80vh] flex flex-col mb-20 ">

       <h1 className=" border-b border-gray-200 flex px-6 py-5 font-bold text-2xl ">Chat</h1>
        
        <div className="  flex-1 overflow-y-scroll p-5">
             {/* display messages*/}
             {messages.map((msg , index)=>{
                  return(
                    
                    <div key={index} className= " flex flex-col chat chat-start">
                     
  <div className="chat-heade">
    Rohit Sharma
  
    <time className="text-xs opacity-50 p-1">2 hours ago</time>
  </div>
  <div className="bg-gray-200 p-1 rounded shadow-lg">
  <div className="chat-bubble">You have to score in next match!</div>
  </div>
</div>

                  )
             })}
        </div>

        <div className="flex border-t border-gray-200 p-5 items-center gap-2">
             <input placeholder="Type a message..." className="flex-1 border border-gray-300  rounded p-1"></input>
             
             <button className="bg-lime-200 p-2 hover:bg-lime-400  rounded-xl border border-black ">Send</button>
             
        </div>
      
    </div>
  )
}
