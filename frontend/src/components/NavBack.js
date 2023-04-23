import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return(
        <> 
            <nav className="nav-back"> 
                <Link to="../leetcode">Back</Link>
                <Link to="/">Home</Link>
                <Link to="../contact">Contact</Link>
            </nav>
        </>
    );
}

export default Nav;