import React, { useEffect, useState } from "react";
import axiosInstance from "./Axios";
import Posts from "./Posts";

const Panel = () => {

    const [userData,setUserData] = useState({username:null,email:null,posts:null})

    useEffect(() => {
        axiosInstance.get('user/')
            .then(response => {
                setUserData({username:response.data.username,email:response.data.email,posts:response.data.posts})
            })
            .catch(error => {
                console.error('Error GET request: ',error)
            })
    },[setUserData])

    return(
        <React.Fragment>
            <div className="greetings">
                <h1>Hello {userData.username}!</h1>
                <h3>Your posts: </h3>
            </div>
            <Posts posts={userData.posts}/>
            
        </React.Fragment>
    )
}



export default Panel