import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Body() {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
