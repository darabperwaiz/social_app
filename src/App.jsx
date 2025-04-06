import { Profiler, useState } from 'react'
import './App.css'
import Login from "./pages/Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./components/Auth/PrivateRoute"
import Home from "./pages/Home/Home"
import Layout from "./Layout"
import Profile from "./pages/Profile/Profile"
import NewPost from "./pages/NewPost/NewPost"

function App() {
  

  return (
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/post/new" element={<NewPost />}/>
          </Route>
        </Route>
      </Routes>
  )
}

export default App
