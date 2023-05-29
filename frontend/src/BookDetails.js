import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import React from "react";
import "./BookDetails.css";
import TopNav from "./TopNav";
import Progress from "./Progress";

const BookDetails = () => {
    const {bookId} = useParams();
    const [book, setBook] = useState({});

    useEffect(() => {
        async function fetchBook () {
            try {
                console.log("inside fetchbook")
                const response = await fetch(`http://localhost:5000/books/${bookId}`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                    });
                const data = await response.json();
                setBook(data.book);
            } catch (error) {
                console.error(error);
            }
        }
        fetchBook();
    }, []);

    return (
        <>
        <TopNav/>
        <div className="bookDetailsContent">
            <img src={book.cover} alt={book.title} />
            <div className="bookshelf"></div>

            <h2>{book.title}</h2>
            <h3>{book.author}</h3>

            <Progress numPages={book.numOfPages} bookId={bookId} />

            <p className="subtitle">
                <b>Published in</b>: {book.yearPublished} <br /><br />
                <b>Publisher</b>: {book.publisher} <br /><br />
                <b>Number of pages</b>: {book.numOfPages} pages <br /><br />
                <b>ISBN</b>: {book.ISBN}
            </p>

            <p className="summary">
                <b>Summary</b><br /><br />
                {book.summary}</p>
        </div></>
    )
}

export default BookDetails;
