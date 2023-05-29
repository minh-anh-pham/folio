import React from "react";
import {useState} from "react";
import "./LogInForm.css";
import {useNavigate} from "react-router-dom";

const LogInForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (props.tab === "signUp") {
            try {
                const response = await fetch("http://localhost:5000/signup", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(Object.assign({}, {email}, {password}))
                    });

                const responseMsg = await response.json();

                setFeedback(responseMsg.message);

                if (responseMsg.status === 200) {
                    useNavigate("/personal");
                }
            } catch (error) {
                console.error(error);
            }
        }
        else if (props.tab === "logIn") {
            try {
                const response = await fetch(`http://localhost:5000/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",},
                    body: JSON.stringify(Object.assign({}, {email}, {password}))
                });

                const responseMsg = await response.json();

                localStorage.setItem("token", "Bearer " + responseMsg.token);
                localStorage.setItem("currentUserId", responseMsg.user.id);

                setFeedback(responseMsg.message);

                if (responseMsg.message === "Successfully logged in") {
                    navigate("/personal");
                }
            } catch (error) {
                console.error(error);
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
