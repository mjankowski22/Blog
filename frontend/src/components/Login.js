import React, { useState,useEffect } from "react";
import axiosInstance from "./Axios";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const navigation = useNavigate()
    
    const login = (event) => {
        event.preventDefault()
        axiosInstance.post('token/',{
            username:document.getElementById('InputUsername').value,
            password:document.getElementById('InputPassword').value,
        })
        .then((res)=>{
            localStorage.setItem('access_token',res.data.access)
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token')
            localStorage.setItem('is_logged',true)
            navigation('/')
        })
        
    }

    

    

    return(
    <React.Fragment>
        <form className="register-form">
        <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" id="InputUsername" name="username" placeholder="Enter Username"/>
            </div>
            
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="InputPassword" placeholder="Password" name="password"/>
            </div>
            <button type="submit" className="btn btn-primary btn-reg" onClick={login}>Log in</button>
            
        </form>
    </React.Fragment>
    )
}

export default Login