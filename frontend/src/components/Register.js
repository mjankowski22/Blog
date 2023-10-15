import React, { useState } from "react";
import validator from 'validator'
import axiosInstance from "./Axios";
import { useNavigate } from "react-router-dom";


const Register = () => {

    const navigation = useNavigate()
    const [errorObjPass,setErrorObjPass] = useState(false)
    const [errorObjmail,setErrorObjmail] = useState(false)
    const [errorObjServer,setErrorObjServer] = useState({visibility:false,text:""})

    

    const checkPassword = (event) => {
        if(document.getElementById('InputPassword').value != document.getElementById('InputPassword2').value){
            setErrorObjPass(true)
        }else{
            setErrorObjPass(false)
        }
    }

    const checkEmail= (event) => {
        if(validator.isEmail(event.target.value) || event.target.value ==""){
            setErrorObjmail(false)
        }else{
            setErrorObjmail(true)
        }
    }

    const createUser = (event) => {
        event.preventDefault()

        axiosInstance.post('register/',{
            email:document.getElementById('InputEmail').value,
            username:document.getElementById('InputUsername').value,
            password:document.getElementById('InputPassword').value,
        })
        .then((res)=>{
            navigation('/')
        })
        .catch((error) => {
            console.log(error)
            setErrorObjServer({visibility:true,text:error.response.data.text})
        })
    }

    return(
    <React.Fragment>
        <form className="register-form">
        <div className="form-group">
                <label for="InputUsername">Username</label>
                <input type="text" className="form-control" id="InputUsername" name="username" placeholder="Enter Username"/>
            </div>
            <div className="form-group">
                <label for="InputEmail">Email address</label>
                <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={checkEmail}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group" style={{display:errorObjmail ? "block" : "none"}}>
                <p style={{color:"red"}}>It is not correct email</p>
            </div>
            <div className="form-group">
                <label for="InputPassword">Password</label>
                <input type="password" className="form-control" id="InputPassword" placeholder="Password" name="password" onChange={checkPassword}/>
            </div>
            <div className="form-group">
                <label for="InputPassword2">Repeat Password</label>
                <input type="password" className="form-control" id="InputPassword2" placeholder="Repeat Password" onChange={checkPassword}/>
            </div>
            <div className="form-group" style={{display:errorObjPass ? "block" : "none"}}>
                <p style={{color:"red"}}>Passwords doesn't match</p>
            </div>
            <button type="submit" className="btn btn-primary btn-reg" onClick={createUser}>Submit</button>
            <div className="form-group" style={{display:errorObjServer.visibility? "block" : "none"}}>
                <p style={{color:"red"}}>{errorObjServer.text}</p>
            </div>
            
        </form>
    </React.Fragment>
    )
}

export default Register