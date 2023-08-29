import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import NavBar from './Components/navBar/NavBar';
import Landing from './Components/landing/Landing'
import Home from './Components/home/Home';
import Form from './Components/form/Form';
import Detail from './Components/detail/Detail';
import { makeCountryNameList } from './Redux/actions';


function App() {
  const location = useLocation()
  const dispatch = useDispatch()

  const listFunction = ()=>{ 
    axios("http://localhost:3001/countries/")
    .then(({data})=>{
      const countryNames = data.map(country=>{
        return(country.name)
      })
      dispatch(makeCountryNameList(countryNames))
    })

  }
  useEffect( ()=>{ 
    listFunction()
  },[])

  return (
    <div>
      {
        location.pathname !== "/"? <NavBar/> : null
      }
    
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/form' element={<Form/>} />
      </Routes>
    </div>
  )
}

export default App
