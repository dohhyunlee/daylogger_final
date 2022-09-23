import React, { useEffect, useState, useCallback } from "react";
import TopBar from "./TopBar";
import "./edit.css";
import IdleTimerContainer from "./IdleTimerContainer";
import {
    getQAPIMethod,
    createQAPIMethod,
    deleteQByIdAPIMethod,
    updateQAPIMethod,
    deleteAnswersByQIDAPIMethod,
} from "../api/client";

function Edit() {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQAPIMethod().then((q) => {
            setQuestions(q);
        });
    },
        []
    )

    const insertQuestion = () => {
        const current = new Date();
        const newQ = {
            text: "New Question",
            type: "1",
            answer: "",
            choices: ["", "", ""]
        }
        createQAPIMethod(newQ, (response) => {
            console.log("Created the Q on the server");
        }).then((response) => {
            console.log(response);
            setQuestions([response, ...questions]);
        });
        console.log("inserted");
    };

    const deleteQuestion = (q) => {
        deleteQByIdAPIMethod(q).then((response) => {
            console.log("Deleted the note on the server");
            const clonedData = [...questions];
            const index = clonedData.indexOf(q);
            if (index > -1) {
                clonedData.splice(index, 1);
            }
            setQuestions(clonedData);
        })
        deleteAnswersByQIDAPIMethod(q._id).then();
    }

    function debounce(func, timeout = 800){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const cb = (d,i) => {
        updateQAPIMethod(d[i]).then(
            console.log("update"));
    }

    const handletext = (e, i) => {
        const clonedData = [...questions];
        clonedData[i].text = e.target.value;
        setQuestions(clonedData);
    };

    const handletype = (e, i) => {
        const clonedData = [...questions];
        clonedData[i].type = e.target.value;
        setQuestions(clonedData);
        updateQAPIMethod(clonedData[i]).then(
            console.log("update"));
    };

    const handlechoice = (e, i, j) => {
        const clonedData = [...questions];
        clonedData[i].choices[j] = e.target.value;
        setQuestions(clonedData);
    };

    const update = useCallback(debounce((d,i) => {console.log("update"); cb(d,i)}),[]);

    return (
        <div className="mainpagediv">
            <IdleTimerContainer></IdleTimerContainer>
            <TopBar />
            <div className="maincontainer">
                <div>
                    <div className="mainsubtitle">Edit Questions</div>
                    <span className="material-icons" onClick={insertQuestion} style={{ float: 'right', right: '15px', top: "25px" }}>add_circle_outline</span>
                </div>
                {console.log("QUESTIONS: " + questions)}
                <div className="editMiddle">
                    <div className="questions">
                        {questions.map((q, i) => (
                            <div className="qcontainer">
                                <div className="inputcontainer">
                                    <input type="text" value={q.text} onChange={(e) => {handletext(e, i); update(questions,i)}} name="text" required />
                                </div>
                                <div>
                                    <select className="select" onChange={(e) => handletype(e, i)} value={q.type}>
                                        <option value="1">number</option>
                                        <option value="2">boolean</option>
                                        <option value="3">text</option>
                                        <option value="4">multiple choice</option>
                                    </select>
                                    <span id="deleteQuestion" className="material-icons" onClick={() => deleteQuestion(q)}>delete_outline</span>
                                    <div className={q.type === "4" ? 'mul' : 'nomul'}>
                                        <input type='radio' className="disabledRadio" disabled />
                                        <input id="choices" type="text" value={q.choices[0]} onChange={(e) => {handlechoice(e, i, 0); update(questions,i)}} name="choice" required autoComplete="off" />
                                        <input type='radio' className="disabledRadio" disabled />
                                        <input id="choices" type="text" value={q.choices[1]} onChange={(e) => {handlechoice(e, i, 1); update(questions,i)}} name="choice" required autoComplete="off" />
                                        <input type='radio' className="disabledRadio" disabled />
                                        <input id="choices" type="text" value={q.choices[2]} onChange={(e) => {handlechoice(e, i, 2); update(questions,i)}} name="choice" required autoComplete="off" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit;