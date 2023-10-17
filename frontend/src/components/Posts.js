import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import AddPost from "./AddPost";



var truncate = (text) => {
    return text.length > 50 ? text.substring(0,49) + "..." : text
}

var Posts = (props) => {

    
    const {posts,setAdd} = props
    const location = useLocation()
    
    const add = (event) => {
        event.preventDefault()
        setAdd(true)
    }

    if((!posts || posts.length === 0) && location.pathname!=='/panel') return <p>Could not find any post</p>

    return(
        
        <div className="row row-cols-2 row-cols-md-4 gallery">
            {posts && posts.map((post) => (
            <div key={post.id} className="col mb-4">
            <div className="card h-100" style={{ width: "18rem" }}>
                <img src="https://picsum.photos/100/50" className="card-img-top" alt="..." />
                <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text" style={{maxWidth:"150px"}}>
                    {truncate(post.content)}
                </p>
                <a href={`post/${post.slug}`} className="btn btn-primary">
                    Zobacz calosc
                </a>
                </div>
            </div>
            </div>
            ))}
            {location.pathname === '/panel' &&
            <div className="col mb-4">
            <div className="card h-100" style={{ width: "18rem" }}>
                <img src="https://cdn-icons-png.flaticon.com/512/107/107078.png" className="card-img-top" style={{scale:"0.7"}} alt="..." />
                <div className="card-body">
                <a onClick={add} className="btn btn-primary">
                    Dodaj post
                </a>
                </div>
            </div>
            </div>
        }
        </div>
    )
        
    
    


}

export default Posts;

