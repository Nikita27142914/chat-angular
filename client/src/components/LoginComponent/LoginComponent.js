import React, { useState } from "react"
import axios from "axios"

import "./LoginComponent.sass"


function LoginComponent({history}) {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3002/login", {
            "login": login,
            "password": password}).then(res => {
                if(res.status === 200) {
                    localStorage.setItem("token", res.data)
                    
                    history.push("/home")
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className="login-container">
            <div className="card card-login">
                <div className="card-body">
                    <h1 className="card-title">Вход</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputLogin">Логин</label>
                            <input type="text" 
                                name="login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                className="form-control"
                                id="inputLogin" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Пароль</label>
                            <input type="password" 
                                name="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="inputPassword" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Войти</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent
