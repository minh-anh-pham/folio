import React from "react";
import finger from "./finger-point.png";
import "./TopNav.css";
import { Link } from 'react-router-dom';

const TopNav = (props) => {
    return (
        <>
        <div className="titleWrapper topNav" style={{cursor: 'url(manicule.png), auto'}}>
            <img className="finger-point" src={finger} alt="finger-point" />
            <Link style={{textDecoration: 'none'}} to="/">
                <h1>folio</h1>
            </Link>
            <img className="finger-point-left" src={finger} alt="finger-point" />
        </div>
        </>
    )
}

export default TopNav;
