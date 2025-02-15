import { Route, Routes } from "react-router-dom"
import Body from "./components/Body"

function App() {

  return (
    <>
      
      <Routes>
         <Route path="/" element={<Body/>} />
         <Route path="/login" element={<div>Login Page</div>} />
         <Route path="/signup" element={<div>Signup Page</div>} />


         
      </Routes>
    </>
  )
}

export default App
