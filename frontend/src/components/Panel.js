import React, { useEffect, useState } from "react";
import axiosInstance from "./Axios";
import Posts from "./Posts";
import { useNavigate } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AddPost from "./AddPost";


const Panel = () => {

    
    
    const [userData,setUserData] = useState({username:null,email:null,posts:null})
    const [addVisible,setAdd] = useState(false)
    
    localStorage.setItem('panel_search',true)
    useEffect(() => {
        axiosInstance.get('user/')
            .then(response => {
                setUserData({username:response.data.username,email:response.data.email,posts:response.data.posts})
            })
            .catch(error => {
                console.error('Error GET request: ',error)
            })
    },[setUserData,addVisible])

   
    if(localStorage.getItem('is_logged')===null){
        window.location.href = 'http://localhost:3000'
    }else{
        return (
            <React.Fragment>
              {!addVisible ? (
                <div className="greetings">
                  <h1>Hello {userData.username}!</h1>
                  <h3>Your posts:</h3>
                  <Posts posts={userData.posts} setAdd={setAdd} />
                </div>
              ) : (
                <AddPost username={userData.username} setAdd={setAdd} />
              )}
            </React.Fragment>
          )
         
        }
}



export default Panel
