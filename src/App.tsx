import { Outlet, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Logo from './components/logo/Logo'
import { MdOutlineNotes } from "react-icons/md";
import { SideDrawer } from './components/drawer/Drawer';
import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import Menu from './components/menu/Menu';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import customTheme from './theme/Theme';
function App() {
  const [open, setOpen] = useState(false)
  return (
    <ThemeProvider theme={customTheme(useTheme())}>
      <div className="app">
        <div className="content">
          <Outlet />
        </div>
        <Footer />
        <div className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
          {open ? <IoCloseSharp size={30} /> : <MdOutlineNotes size={30} />}
        </div>
        <div className='top-profile'>
          <div>Barruch</div>
          <img src={"https://picsum.photos/200/300?random=3"} alt={`name`} className="top-profile-img" />
        </div>
        <Logo />
        <SideDrawer open={open} children={<Menu />} />
      </div>
    </ThemeProvider>
  )
}

export default App
