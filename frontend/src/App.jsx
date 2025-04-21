import { Outlet } from "react-router-dom"
import Navbar from "./components/navbar"
import Footer from "./components/Footer"



function App() {

  return (
    <>
    <Navbar></Navbar>
   
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
