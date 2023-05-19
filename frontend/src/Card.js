import './Card.css';
import React from "react";
import { Link } from 'react-router-dom';

const Card = (props) => {

    return (
        <section>
            <div class="card">
            <div class="card-inner">
                <div class="card-front">
                <img src={props.cover} alt={props.title}  />
                </div>
                <div class="card-back">
                    <h2>{props.title}</h2>
                    <h3>{props.author}</h3>
                    <p className="subtitle">{props.yearPublished} | {props.numOfPages} pages</p>
                    <p className="summary">{props.summary}</p>
                    <button>
                        <Link style={{textDecoration: 'none'}} to={`/books/${props.id}`}>
                            <u>See more</u>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
        </section>

    );
}

export default Card;
