import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Logo from './components/logo/Logo'
import { MdOutlineNotes } from "react-icons/md";
import { SideDrawer } from './components/drawer/Drawer';
import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import Menu from './components/menu/Menu';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import customTheme from './theme/Theme';
import useUserStore from './state/UserStore';
import { Snackbar } from './components/snackbar/Snackbar';
import useSnackbarStore from './state/SnackbarStore';
import TopProfile from './components/topPrrofile/TopProfile';

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const user = useUserStore(store => store.user);
  const { snackData, closeStackbar } = useSnackbarStore(store => store);

  return (
    <ThemeProvider theme={customTheme(useTheme())}>
      <div className="app">
        <div className="content">
          <Outlet />
        </div>
        <Footer />
        <div className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoCloseSharp size={30} /> : <MdOutlineNotes size={30} />}
        </div>
        <TopProfile />

        <Logo />
        <SideDrawer open={menuOpen} children={<Menu onClose={() => setMenuOpen(false)} />} />
        <Snackbar severity={snackData.severity} open={snackData.open} onClose={closeStackbar} text={snackData.text} />
      </div>
    </ThemeProvider>
  )
}

export default App
