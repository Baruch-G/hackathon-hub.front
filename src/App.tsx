import { Outlet, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'

function App() {
  return (
    <div className="app">
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
