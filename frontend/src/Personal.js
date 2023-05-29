import React from "react";
import { useEffect, useState } from "react";
import TopNav from "./TopNav";
import PersonalBook from "./PersonalBook";
import "./Personal.css";
import { Link } from 'react-router-dom';

const Personal = (props) => {
    const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
    const [noBookmarkMsg, setNoBookmarkMsg] = useState(false);
    const [progresses, setProgresses] = useState([]);

    const currentUserId = localStorage.getItem("currentUserId");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/personal?currentUserId=${currentUserId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await response.json();
            console.log(data);
            if (data.length === 0) {
                setNoBookmarkMsg(true);
            } else {
                setBookmarkedBooks(data.books);
                setProgresses(data.progresses);
            }
        }
        fetchData();
      }, []);

    return (
        <>

        <TopNav />

        {currentUserId ? (
            <div className="personalWrapper">
            {noBookmarkMsg? (
                <div className="noBookmarks"><Link style={{textDecoration: 'none'}} to="/"><h2> {"You have no bookmarks - go back home to explore books"} </h2></Link></div>
            ) : null}

            <div className="personalBookList">
            {bookmarkedBooks.map((bookmarkedBook, index) =>
            <>
            <PersonalBook
                key={bookmarkedBook.id}
                id={bookmarkedBook.id}
                cover={bookmarkedBook.cover}
                title={bookmarkedBook.title}
                author={bookmarkedBook.author}
                numOfPages={bookmarkedBook.numOfPages}
                currentPage={progresses[index].currentPage}
            />
            </>
            )}
            </div>
        </div>
        ) : (
            <h2> Please sign in to view your bookmarks </h2>
        )}
        </>
    )
}

export default Personal;
