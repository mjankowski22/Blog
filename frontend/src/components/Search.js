import React from "react";
import Posts from "./Posts";
import { useLocation } from "react-router-dom";


const Search = () => {
    const {state} = useLocation()

    console.log(state)

    return(
        <Posts posts={state.post}/>
    )
}


export default Search