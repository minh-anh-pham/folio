import React from "react";
//import { useEffect, useState } from "react";
import "./PersonalBook.css";
import { Link } from 'react-router-dom';
import Progress from './Progress';

const PersonalBook = (props) => {

    return (
        <>
        <div class="personalBookWrapper">
            <div class="bookCover">
                <Link style={{textDecoration: 'none'}} to={`/books/${props.id}`}>
                <img src={props.cover} alt={props.title} />
                </Link>
            </div>
            <div className="personalBookListShelf"></div>

            <div class="bookDetails">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <Progress bookId={props.id} numPages={props.numOfPages} insidePersonalPage={true}/>
            </div>
            </div>
        </>
    )
}

export default PersonalBook;
