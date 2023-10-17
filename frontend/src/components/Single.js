import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./Axios";
import { useState } from "react";


var Single  = () => {

    let {slug} = useParams()
    const [post,setPost] = useState(null)
    
    useEffect(()=>{
        axiosInstance.get('post/'+slug+'/')
            .then(response => {
                setPost(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error GET request: ',error)
            })
    },[setPost])

    if(!post || post.length === 0 ) return <p>Could not find this post</p>
    return(
        <React.Fragment>
        <div className="px-4 pt-5 my-5 text-center border-bottom">
            <h1 className="display-4 fw-bold">{post.title}</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">{post.content}</p>
            </div>
            
        </div>
        <div className="EDButtons">
            <button type="button" class="btn btn-primary edit">Edit Post</button>
            <button type="button" class="btn btn-danger edit">Delete Post</button>
        </div>
        </React.Fragment>
    )

}


export default Single