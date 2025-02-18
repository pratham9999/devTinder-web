import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { Provider } from "react-redux"
import appStore from "./utils/AppStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
import Request from "./components/Request"

function App() {

  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
         <Route path="/" element={<Body/>} >
         <Route path="/" element={<Feed/>} />
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/login" element={<Login/>} />
         <Route path="/signup" element={<Signup/>} />
         <Route path="/connections" element={<Connections/>} />
         <Route path="/requests" element={<Request/>} />

         </Route> 
      </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
