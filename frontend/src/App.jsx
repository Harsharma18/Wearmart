import { Outlet } from "react-router-dom"
import Navbar from "./components/navbar"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"


function App() {

  return (
    <>
     <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    <Navbar></Navbar>
   
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
