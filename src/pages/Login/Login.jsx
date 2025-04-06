import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'
import style from "./login.module.css"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [credential, setCredential] = useState({
        id: uuid(),
        name: '',
        email: '',
        password: '',
        avatar: ''
    })
    const {login, user} = useAuth();
    const navigate = useNavigate();

    useEffect(()=> {
        if(user) {
            navigate('/');
        }
    }, [user, navigate])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredential((prev)=> (
            {...prev, [name]: value}
        ))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login(credential)
    }
  return (
    <div className={style.container}>
        <div className={style.mainContainer}>
            <div className={style.left}>
                <h2>Social App</h2>
                <p>Social App helps you connect and share with the people in your life.</p>
            </div>
            <div className={style.right}>
                <form className={style.form}>
                    <input type="text" name="name" value={credential.name} placeholder="Full Name" onChange={handleChange}/>
                    <input type="text" name="email" value={credential.email} placeholder="Email Address" onChange={handleChange}/>
                    <input type="text" name="password" value={credential.password} placeholder="Password" onChange={handleChange}/>
                    <button onClick={handleSubmit}>Log in</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login
