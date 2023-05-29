import './Home.css';
import React from "react";
import finger from "./finger-point.png";
import writing from "./writing.png";
import Card from "./Card";
import LogInForm from "./LogInForm";
import {useState, useEffect} from "react";

const Header = (props) => {
    const [books, setBooks] = useState([]);
    const [tab, setTab] = useState("bookList");

    const handleLogInClick = () => {
        setTab("logIn");
    }

    const handleSignUpClick = () => {
        setTab("signUp");
    }

    const handleTitleClick = () => {
        setTab("bookList");
    }

    useEffect(() => {
        async function fetchBooks () {
            try {
                const response = await fetch("http://localhost:5000/books/", {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                    });
                const data = await response.json();
                setBooks(Object.values(data.allBooks));
            } catch (error) {
                console.log(error);
            }
        }
        fetchBooks();
    }, []);

    return (
        <>
        <div className="titleWrapper" onClick={handleTitleClick}>
            <img className="finger-point" src={finger} alt="finger-point" />
            <h1 >{props.title}</h1>
            <img className="finger-point-left" src={finger} alt="finger-point" />
        </div>

        <p>Explore books & track your reading progress</p>

        {tab === "bookList" && (
        <>
            <div className="homeBookListWrapper">
            {books.map(book =>
                <Card
                    key={book.title}
                    title={book.title}
                    author={book.author}
                    yearPublished={book.yearPublished}
                    numOfPages={book.numOfPages}
                    summary={book.summary}
                    cover={book.cover}
                    id={book.id}
                />)}
            </div>
        </>
        )}

        {(tab === "logIn" || tab === "signUp") && (
        <>
            <LogInForm tab={tab} />
        </>
        )}

        <div className="logInWrapper">
            <div className="logIn" onClick={handleLogInClick}>
            <img className="writing" src={writing} alt="hand-writing" />
            <h2><u>Log in</u></h2>
            <img className="writing-left" src={writing} alt="hand-writing" />
            </div>

            <div className="signUp" onClick={handleSignUpClick}>
            <img className="writing" src={writing} alt="hand-writing" />
            <h2><u>Sign up</u></h2>
            <img className="writing-left" src={writing} alt="hand-writing" />
            </div>
        </div>
        </>

    )
}

export default Header;
