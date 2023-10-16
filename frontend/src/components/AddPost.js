import React, { useState,useEffect } from "react";
import axiosInstance from "./Axios";
import { useNavigate } from "react-router-dom";


const AddPost = (props) => {

    const navigation = useNavigate()
    
    const add = (event) => {
        event.preventDefault()
        axiosInstance.post('add/',{
            title:document.getElementById('InputTitle').value,
            content:document.getElementById('InputContent').value,
            username:props.username

        })
        .then((res)=>{
            props.setAdd(false)
            
            navigation('/panel')
        })
        
    }
    return(
    <React.Fragment>
        <form className="register-form">
        <div className="form-group">
                <label>Post Title</label>
                <input type="text" className="form-control" id="InputTitle" name="InputTitle" placeholder="Post Title"/>
            </div>
            
            <div className="form-group">
                <label>Post Content</label>
                <textarea rows="4" cols="50" className="form-control" id="InputContent" placeholder="Post Conent" name="InputContent"></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-reg" onClick={add}>Add Post</button>
            
        </form>
    </React.Fragment>
    )
}


export default AddPost