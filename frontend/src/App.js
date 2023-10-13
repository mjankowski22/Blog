import {React,useState,useEffect} from "react";
import Posts from './components/Posts'
import axiosInstance from './components/Axios'

function App() {

    const [posts,setPosts] = useState(null)

    useEffect(() => {
        axiosInstance.get()
            .then(response => {
                setPosts(response.data)
            })
            .catch(error => {
                console.error('Error GET request: ',error)
            })
    },[setPosts])

    return (
      <div className="App">
          <Posts posts={posts}/>
      </div>
    )
}

export default App;
