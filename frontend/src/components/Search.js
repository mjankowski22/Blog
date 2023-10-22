import React from "react";
import Posts from "./Posts";
import { useLocation } from "react-router-dom";


const Search = () => {
    const {state} = useLocation()


    return(
        <Posts posts={state.post}/>
    )
}


export default Search