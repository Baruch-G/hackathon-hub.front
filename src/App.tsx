import { Outlet, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Logo from './components/logo/Logo'
import { MdOutlineNotes } from "react-icons/md";

function App() {
  return (
    <div className="app">
      <div className="content">
        <Outlet />
      </div>
      <Footer />
      <div className='burger'>
        <MdOutlineNotes size={30} />
      </div>
      <Logo />
    </div>
  )
}

export default App
