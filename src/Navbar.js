import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
    return (  
        <>
    
        <ul id="navbar">

            <h1 className="heading">Books Corner</h1>

            <div className ="menu">
     
            <li>
                <Link to="/">
                Your Books
                </Link>
            </li>

            <li>
                <Link to ="/WantToRead">
                Want to Read
                </Link>
            </li>


            <li>
                <Link to="/HaveRead">
                Have Read
                </Link>
            </li>

            </div>
        </ul>
        </>
    );
}
 
export default Navbar;