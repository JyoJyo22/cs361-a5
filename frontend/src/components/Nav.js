import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    return(
        <> 
            <nav> 
                <Link to="/">Home</Link>
                <Link to="../contact">Contact</Link>
                <Link to="../leetcode">LeetCode</Link>
            </nav>
        </>
    );
}

export default Nav;