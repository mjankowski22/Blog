import React from "react";
import './styles.css'

var Header = () => {
    return(
    <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand">Blog</a>
            <form className="ms-auto">
                <button className="btn btn-outline-success me-2" type="button">Log In</button>
            </form>
            <form className="ms-2">
                <button className="btn btn-outline-success me-2" type="button">Log Out</button>
            </form>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
    )
}

export default Header;