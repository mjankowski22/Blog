import React, { useState } from "react";
import './styles.css'
import axiosInstance from "./Axios";
import {useNavigate} from "react-router-dom"
import Posts from "./Posts";




var Header = () => {

    const navigate = useNavigate()

    const [data,setData] = useState("")

    const handleChange = (event) =>{
        setData(event.target.value)
    }
    const handleClick = (event) => {
        event.preventDefault()
        axiosInstance.get('/search/',
            {params:{search:data}}
        )
            .then(response => {
                const post = response.data
                navigate(`/search`,{state:{post:post}})
            })
            .catch(error => {
                console.error('Error GET request: ',error)
            })
        

    }

    const register = (event) => {
      navigate('/register')
    }

    return(
        <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Blog</a>
          <form className="ms-auto">
            <button className="btn btn-outline-success me-2" type="button">Log In</button>
          </form>
          <form className="ms-2">
            <button className="btn btn-outline-success me-2" type="button" onClick={register}>Register</button>
          </form>
          <form className="d-flex" role="search">
            <div id="search" >
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" onChange={handleChange}/>
            </div>
            <button className="btn btn-outline-success" type="submit" onClick={handleClick}>Search</button>
          </form>
        </div>
      </nav>
      
    )
}

export default Header;