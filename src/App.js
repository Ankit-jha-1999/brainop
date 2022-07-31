import React from 'react'
import './App.css'
import Dashboard1 from './components/Dashboard1'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
    <div className='App'>
       <Navbar/>
        <Dashboard1/>
    </div>
    </>
  )
}

export default App

