import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import { Outlet } from "react-router-dom"
import style from "./layout.module.css"

const Layout = ({children}) => {
  return (
    <div className={style.mainContainer}>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
