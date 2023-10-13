import React from "react";


var Footer = () => {
    return (
    <footer className="bg-light text-center text-lg-start footer">
        <div className="text-center p-3">
            © {new Date().getFullYear()} Copyright:
            <span className="text-dark"> MDBootstrap.com</span>
        </div>
    </footer>
    )
}

export default Footer;