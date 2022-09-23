import profilepic from "../simpson.jpg";
import React from "react";
import "./edit.css";
import { getUserAPIMethod } from '../api/client';
import { useState, useEffect } from "react";

function TopBar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserAPIMethod().then((u) => {
            setUser(u);
            console.log("topbar");
            console.log(u);
            console.log(u[0].admin);
        });
    },
        []
    )


    return (

        <section className="topbar">
            <div className="title">Day Logger</div>
            <nav className="cl-effect-1">
                {user !== null && (
                    <div className="area">
                        <li className="item"><a className="pages" href="/logdata">Log Data</a></li>
                        <li className="item"><a className="pages" href="/editpage">Edit Questions</a></li>
                        <li className="item"><a className="pages" href="/viewdatapage">View Data</a></li>
                        <li className="item">{user !== null && user[0].admin === true && <a className="pages" href="/adminpage">Admin</a>}</li>
                        <li className="item"><a className="prof" href="/profilepage"><img src={user[0].profileURL} className="profile" alt="MyImage"></img></a></li>
                    </div>
                )}
            </nav>
        </section>

    )
}

export default TopBar;