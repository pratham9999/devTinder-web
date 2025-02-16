import { Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {

  return (
    <div data-theme="lightgreen">
      
      <Routes>
         <Route path="/" element={<Body/>} />
         <Route path="/login" element={<div><Login/></div>} />
         <Route path="/signup" element={<Signup/>} />


         
      </Routes>
    </div>
  )
}

export default App
