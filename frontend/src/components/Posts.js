import React from "react";



var truncate = (text) => {
    return text.length > 50 ? text.substring(0,49) + "..." : text
}

var Posts = (props) => {

    const {posts} = props


    if(!posts || posts.length === 0 ) return <p>Could not find any post</p>

    return(
        <div className="row row-cols-2 row-cols-md-4 gallery">
            {posts.map((post) => (
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
        </div>
    )
        
    
    {/* return (
        <div>
          <h1>Lista Postów</h1>
          <ul>
            {posts.map((post) => (
              <li>{post.title}</li>
            ))}
          </ul>
        </div>
      ); */}
    


}

export default Posts;

