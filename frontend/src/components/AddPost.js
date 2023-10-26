import React, { useState,useEffect } from "react";
import axiosInstance from "./Axios";
import { useNavigate } from "react-router-dom";


const AddPost = (props) => {

    const navigation = useNavigate()
    const [selectedFile,setSelectedFile] = useState(null)
    
    const add = (event) => {
        console.log(selectedFile)
        event.preventDefault()
        axiosInstance.post('add/',{
        
            title:document.getElementById('InputTitle').value,
            content:document.getElementById('InputContent').value,
            username:props.username,
            image:selectedFile

        },
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        .then((res)=>{
            props.setAdd(false)
            
            navigation('/panel')
        })
        
    }
    return(
    <React.Fragment>
        <form className="register-form" encType="multipart/form-data">
        <div className="form-group">
                <label>Post Title</label>
                <input type="text" className="form-control" id="InputTitle" name="InputTitle" placeholder="Post Title"/>
            </div>
            
            <div className="form-group">
                <label>Post Content</label>
                <textarea rows="4" cols="50" className="form-control" id="InputContent" placeholder="Post Conent" name="InputContent"></textarea>
            </div>
            <div class="form-group">
            <label >Choose Photo</label>
                <input type="file" onChange={(e)=> setSelectedFile(e.target.files[0] )}className="form-control-file" id="image" name="image"/>
            </div>
            <button type="submit" className="btn btn-primary btn-reg" onClick={add}>Add Post</button>
            
        </form>
    </React.Fragment>
    )
}


export default AddPost