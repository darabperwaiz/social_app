import React, { useState } from 'react'
import style from './navbar.module.css';
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
    const {user, logout} = useAuth();
    const [active, setActive] = useState(false)

    const handleDropdown = () => {
        setActive(!active)
    }
  return (
    <div className={style.nav}>
      <p>Social App</p>
      <ul className={style.navItems}>
        <li title="Home"><Link to="/">Home</Link></li>
        <li title="Create"><Link to="/post/new">Create</Link></li>
        <li className={style.profile} title="Profile" onClick={handleDropdown}>
            {user.avatar ? <img src={user.avatar} alt="" /> : <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" />}
            <ul className={active ? `${style.dropdown} ${style.active}` : `${style.dropdown}`}>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout}>Logout</Link></li>
            </ul>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
