import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./Axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


var Single  = () => {

    const navigate = useNavigate()
    let {slug} = useParams()
    const [post,setPost] = useState(null)
    const [editPost,setEdit] = useState(false)
    const [deletePost,setDelete] = useState(false)
    const [formData,setFormData] = useState({title:'',content:''})
    const [userIsAuthor,setUserIsAuthor] = useState(false)

    useEffect(()=>{
        axiosInstance.get('post/'+slug+'/')
            .then(response => {
                setPost(response.data)
                setFormData({title:response.data.title,content:response.data.content})
            })
            .catch(error => {
                console.error('Error GET request: ',error)
            })
    },[slug])


    useEffect(()=>{
        axiosInstance.post('check-author/',{
            slug:slug
        })
        .then(response => { 
            if (response.data.isAuthor){
                setUserIsAuthor(true)
            }else{
                setUserIsAuthor(false)
            }
        })
        .catch(error => {
            setUserIsAuthor(false)
        })
    },[slug])

    const handleForm = (event,fieldName) => {
        setFormData({
            ...formData,
            [fieldName]:event.target.value
        })
    }

    const handleEdit = (event) => {
        event.preventDefault()
        axiosInstance.post('update/',{
            id:post.id,
            title:formData.title,
            content:formData.content
        })
        .then(response => {
            setEdit(false)
            navigate('/post/'+response.data.slug)
        })
        
    }

    const handleDelete = (event) => {
        event.preventDefault()
        axiosInstance.post('delete/',{
            id:post.id,
        })
        .then(response => {
            setDelete(false)
            navigate('/panel')
        })
    }
    console.log(userIsAuthor)

    if(!post || post.length === 0 ) return <p>Could not find this post</p>
    return(
        <React.Fragment>
        <div className="px-4 pt-5 my-5 text-center border-bottom">
            <h1 className="display-4 fw-bold">{post.title}</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">{post.content}</p>
            </div>
            
        </div>
        {(editPost && !deletePost && userIsAuthor &&
        <form className="register-form update-form">
            <h1>Edit Post</h1>
        <div className="form-group">
                <label>Post Title</label>
                <input type="text" className="form-control" id="InputTitle" name="InputTitle" placeholder="Post Title" value={formData.title} onChange={(event) => handleForm(event,'title')}/>
            </div>
            
            <div className="form-group">
                <label>Post Content</label>
                <textarea rows="4" cols="50" value={formData.content} onChange={(event) => handleForm(event,'content')} className="form-control" id="InputContent" placeholder="Post Conent" name="InputContent"></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-reg" onClick={handleEdit}>Edit Post</button>
            <button type="submit" className="btn btn-primary btn-reg" onClick={()=>setEdit(false)}>Back</button>
            
        </form>
        )
        }
        {(!editPost && deletePost && userIsAuthor &&
        <div className="EDButtons">
            <h1>Are you sure you want to delete this post?</h1>
            <button type="button" onClick={()=>setDelete(false)} className="btn btn-primary edit">No</button>
            <button onClick={handleDelete} type="button" className="btn btn-danger edit">Yes</button>
        </div>
        )
        }
        {(!editPost && !deletePost && userIsAuthor &&
        <div className="EDButtons">
            <button type="button" className="btn btn-primary edit" onClick={()=>setEdit(true)}>Edit Post</button>
            <button type="button" className="btn btn-danger edit" onClick={()=>setDelete(true)}>Delete Post</button>
        </div>
        )
        }
        
        

        </React.Fragment>
    )

}


export default Single