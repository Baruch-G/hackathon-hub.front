import { Outlet, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'

function App() {
  return (
    <div className="app">
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
