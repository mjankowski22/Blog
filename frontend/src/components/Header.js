import React, { useState,useEffect} from "react";
import './styles.css'
import axiosInstance from "./Axios";
import {useNavigate} from "react-router-dom"
import jwt_decode from "jwt-decode"




var Header = () => {

    const navigate = useNavigate()

    const [data,setData] = useState("")


    const user_panel = (event) => {
      event.preventDefault()
      navigate('/panel')
    }

    const handleChange = (event) =>{
        setData(event.target.value)
    }
    const handleClick = (event) => {
        event.preventDefault()
        axiosInstance.get('/search/',
            {params:{search:data,isLogged:localStorage.getItem('panel_search')}}
        )
            .then(response => {
                const post = response.data
                navigate(`/search`,{state:{post:post}})
            })
            .catch(error => {
                console.error('Error GET request: ',error)
            })
        

    }

    const login = (event) => {
          event.preventDefault()
          navigate('/login') 
    }

    useEffect(() => {
      const accessToken = localStorage.getItem('access_token');
      const tokenExpiration = accessToken ? jwt_decode(accessToken).exp : null;
      
      if (tokenExpiration) {
          const currentTime = Date.now() / 1000;
          const timeToExpiration = tokenExpiration - currentTime;
          
          if (timeToExpiration <= 0) {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              axiosInstance.defaults.headers['Authorization'] = null;
              localStorage.removeItem('is_logged');
              navigate('/login');
          }
      }
  }, [localStorage.getItem('is_logged')]);


    const logout = (event) => {
          localStorage.setItem('panel_search',false)
          event.preventDefault()
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          axiosInstance.defaults.headers['Authorization'] = null
          localStorage.removeItem('is_logged')
          navigate('/login')
          }
    

    const register = (event) => {
      event.preventDefault()
      navigate('/register')
    }

    return(
        <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Blog</a>
          {!localStorage.getItem('is_logged') ?
          <React.Fragment>
          <form className="ms-auto">
            <button className="btn btn-outline-success me-2" type="button" onClick={login}>Log in</button>
          </form>
          <form className="ms-2">
            <button className="btn btn-outline-success me-2" type="button" onClick={register}>Register</button>
          </form>
          </React.Fragment>
          :
          <React.Fragment>
          <form className="ms-auto">
          <button className="btn btn-outline-success me-2" type="button" onClick={user_panel}>Your profile</button>
          </form>
          <form className="ms-auto">
            <button className="btn btn-outline-success me-2" type="button" onClick={logout}>Log out</button>
          </form>
        </React.Fragment>
          }
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
