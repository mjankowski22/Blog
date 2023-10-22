import React from "react";



const Settings = () => {

    
    if(localStorage.getItem('is_logged')===null){
        window.location.href = 'http://localhost:3000'
    }

    return(
        <h1>Hello World</h1>
    )
}


export default Settings