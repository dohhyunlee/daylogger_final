import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import "./edit.css"
import "./admin.css"
import IdleTimerContainer from "./IdleTimerContainer";

import {
    getAllQAPIMethod,
    createQAPIMethod,
    deleteQByIdAPIMethod,
    updateQAPIMethod,
    getAllAnswersAPIMethod,
    getUsersAPIMethod, deleteUserByIdAPIMethod
} from "../api/client";

function Admin() {

    const [users, setUsers] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [update, setUpdate] = useState(null);

    useEffect(() => {
        getUsersAPIMethod().then((u) => {
            setUsers(u);
            console.log(u);
        });
        getAllQAPIMethod().then((q) => {
            setQuestions(q);
        });
        getAllAnswersAPIMethod().then((a) => {
            setAnswers(a);
        });
    },
        []
    )

    useEffect(() => {
        getUsersAPIMethod().then((u) => {
            setUsers(u);
            console.log(u);
        });
        getAllQAPIMethod().then((q) => {
            setQuestions(q);
        });
        getAllAnswersAPIMethod().then((a) => {
            setAnswers(a);
        });
    },
        [update]
    )

    const num = (arr, u) => {
        const found = arr.filter(o =>
            o.user === u
        )
        console.log(found);
        return found.length;
    }

    const lastday = (arr, u) => {
        const found = arr.filter(o =>
            o.user === u
        )
        if (found.length === 0) {
            return "No response";
        } else {
            const sorted = found.sort((a, b) => b.datedot.localeCompare(a.datedot))
            return sorted[0].dateslash;
        }

    }

    const deleteUser = (u) => {
        deleteUserByIdAPIMethod(u).then((res) => setUpdate(res));
    }

    return (
        <div className="adminpagediv">
            <IdleTimerContainer></IdleTimerContainer>
            <TopBar />
            <div className="adminpagecontainer">


                {users !== null && questions !== null && answers !== null && users.map((u) => (
                    <div className="usercontainer">
                        <div>
                            <div className="courses-container">
                                <div className="course">
                                    <div className="course-preview">
                                        <h6>User Info</h6>
                                        <h3>Name : {u.name}</h3>
                                        <h3>Email: {u.email}</h3>
                                    </div>
                                    <div className="course-info">
                                        <h6>Statistics</h6>
                                        <span className="material-icons" onClick={() => { deleteUser(u) }}
                                            style={{ float: "right" }}>delete_outline</span>
                                        <h2>Number of Questions: {num(questions, u._id)}</h2>
                                        <h2>Number of Responses: {num(answers, u._id)}</h2>
                                        <h2>Last Response: {lastday(answers, u._id)}</h2>
                                    </div>
                                </div>
                            </div>
                            {/*<div className='userdiv'>
                                <div>
                                    <label>Name: </label>
                                    <label htmlFor='inputQuestion'>{u.name} </label>
                                    <span className="material-icons" onClick={() => {deleteUser(u)}}
                                          style={{float:"right"}}>delete_outline</span>
                                </div>
                                <div>
                                    <label>Email: </label>
                                    <label htmlFor='inputQuestion'>{u.email}</label>
                                </div>
                                <div>
                                    <label>Number of Questions: </label>
                                    <label htmlFor='inputQuestion'>{num(questions,u._id)} </label>
                                </div>
                                <div>
                                    <label>Number of Responses: </label>
                                    <label htmlFor='inputQuestion'>{num(answers,u._id)}</label>
                                </div>
                            </div>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Admin;