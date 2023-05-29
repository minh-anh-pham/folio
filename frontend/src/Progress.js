import React from "react";
import { useEffect, useState } from "react";
import "./Progress.css";

const Progress = (props) => {
    const [page, setPage] = useState(0);
    const [submitting, setSubmitting] = useState("");
    const [progressFormError, setProgressFormError] = useState("");
    const [feedback, setFeedback] = useState("");
    const currentUserId = localStorage.getItem("currentUserId");

    useEffect(() => {
        async function fetchCurrentPage() {
            if (currentUserId) {
                // get current page if logged in
                console.log("inside currentuserid");
                console.log(currentUserId);
                console.log(props.bookId);
                const response = await fetch(`http://localhost:5000/progresses?currentUserId=${currentUserId}&currentBookId=${props.bookId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                });
                const data = await response.json();
                console.log(data);

                if (data.message === "Progress doesn't exist") {
                    setPage(0);
                } else {
                    setPage(data.progresses[0].currentPage);
                }
            } else {
                // set current page to 0 if not logged in
                console.log("inside no currentuserid");
                console.log(props.bookId);
                setPage(0);
            }
        }
        fetchCurrentPage();
      }, []);

    const onSubmitForm = async (event) => {
        console.log(currentUserId);

        if (currentUserId) {
            if (page == 0) {
                console.log("inside page is 0");
                try {
                    event.preventDefault();
                    setProgressFormError('');
                    setSubmitting(true);

                    const fetchProgress = await fetch(`http://localhost:5000/progresses?currentUserId=${currentUserId}&currentBookId=${props.bookId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                });

                const fetchedProgress = await fetchProgress.json();

                const response = await fetch(`http://localhost:5000/progresses/${fetchedProgress.progresses[0].id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    const responseMsg = await response.json();

                    setFeedback(responseMsg.message);
                  } catch (err) {
                    console.error(err);
                    setProgressFormError(err.toString());
                  } finally {
                    setSubmitting(false);
                  }
            } else {
                try {
                    event.preventDefault();
                    setProgressFormError('');
                    setSubmitting(true);
                    console.log("inside page isn't 0");

                    const fetchProgress = await fetch(`http://localhost:5000/progresses?currentUserId=${currentUserId}&currentBookId=${props.bookId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token")
                    },
                    });

                    const fetchedProgress = await fetchProgress.json();
                    console.log(fetchedProgress.message);

                    if (fetchedProgress.message !== "Progress doesn't exist") {
                        const response = await fetch(`http://localhost:5000/progresses/${fetchedProgress.progresses[0].id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            "currentPage": parseInt(page),
                        })
                    });
                    const responseMsg = await response.json();
                    setFeedback(responseMsg.message);
                    } else {
                        const response = await fetch("http://localhost:5000/progresses", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            "currentPage": parseInt(page),
                            "bookId": parseInt(props.bookId),
                            "userId": 1
                        })
                    });
                    const responseMsg = await response.json();

                    setFeedback(responseMsg.message);
                    }
                  } catch (err) {
                    console.error(err);
                    setProgressFormError(err.toString());
                  } finally {
                    setSubmitting(false);
                  }
            }

        } else {
            try {
                event.preventDefault();
                    setProgressFormError('');
                    setSubmitting(true);
                setFeedback("Please log in to create bookmarks");
            } catch (err) {
            console.error(err);
            setProgressFormError(err.toString());
          } finally {
            setSubmitting(false);
          }
        }
    }


    return (
        <div className="progressWrapper">
            <form onSubmit={onSubmitForm}>
                <input
                type="number"
                value={page}
                min="0"
                max={props.numPages}
                onChange={e => setPage(e.currentTarget.value)} /> / {props.numPages} pages
                {Boolean(progressFormError) && <div className="progressFormError">
                    {progressFormError}
                </div>}
                <button type="submit" disabled={submitting}></button>
            </form>
            {props.insidePersonalPage ? null : (
                <div className="feedbackWrapper">
                <h3>{feedback}</h3>
                </div>
            )}
        </div>
    )
}

export default Progress;
