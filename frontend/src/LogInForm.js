import React from "react";
import {useState} from "react";
import "./LogInForm.css";

const LogInForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (props.tab === "signUp") {
            try {
                const response = await fetch("http://localhost:5000/signup", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(Object.assign({}, {email}, {password}))
                    });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        else if (props.tab === "logIn") {
            try {
                const response = await fetch(`http://localhost:5000/login`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(Object.assign({}, {email}, {password}))
                    });
                const responseMsg = await response.text();
                setFeedback(responseMsg);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="logInFormWrapper">
        <form onSubmit={handleSubmit}>
            <h3 className="feedback">{feedback}</h3>

            <div className="email">
            <label htmlFor="email"><b>Email address</b></label>
            <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => {setEmail(event.target.value)}}
            autoFocus="autofocus"
            required
            />
            </div>

            <div className="password">
                <label htmlFor="password"><b>Password</b></label>
                <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => {setPassword(event.target.value)}}
                required />
            </div>

            <button type="submit" value="submit"><u>{props.tab === "logIn" ? (<>Log In</>) : (<>Sign Up</>)}</u></button>
        </form>
        </div>
    )
}

export default LogInForm;
