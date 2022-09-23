import TopBar from "./TopBar";
import './LogData.css';
import { createQAPIMethod, getQAPIMethod, updateQAPIMethod, getAnswersByDateAPIMethod, createAnswerAPIMethod, updateAnswersAPIMethod } from "../api/client";
import { useState, useEffect } from "react";
import IdleTimerContainer from "./IdleTimerContainer";


const date = new Date();
const controlDate = new Date();
function LogData() {
    const [date2, setDate2] = useState(date);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log("useEffect in logdata");
            getQAPIMethod().then((q) => {
                setQuestions(q);
                getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then(
                    (a) => {
                        console.log("get answers1");
                        if (a.length === 0) {
                            console.log("a is length 0 (on initial render)");
                            for (var i = 0; i < q.length; i++) {
                                const newA = {
                                    text: "",
                                    dateslash: `${date2.getMonth() + 1}/${date2.getDate()}/${date2.getFullYear()}`,
                                    datedot: `${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`,
                                    qid: q[i]._id,
                                }
                                createAnswerAPIMethod(newA).then(
                                    console.log("saved answer")
                                );
                            }
                            getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then(
                                (a) => { setAnswers(a); })
                        } else {
                            console.log("a is NOT length 0 (on initial render)");
                            const clonedData = [...a];
                            for (var i = a.length; i < q.length; i++) {
                                const newA = {
                                    text: "",
                                    dateslash: `${date2.getMonth() + 1}/${date2.getDate()}/${date2.getFullYear()}`,
                                    datedot: `${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`,
                                    qid: q[i]._id,
                                }
                                createAnswerAPIMethod(newA).then(
                                    console.log("saved answer")
                                );
                            }
                            getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then(
                                (a) => { setAnswers(a); console.log(answers[0].qid); })
                        }
                    }
                )
            })



            console.log("use effect");
        };
        fetchData();
        console.log("afterf");
        //getAnswersAPIMethod
    }, []);



    const handleSubmit = (e) => { //this should be the only place an answer is created.
        e.preventDefault();
        console.log(answers[0].qid);
        const clonedData = [...answers];
        console.log(answers[0].qid);
        for (var i = 0; i < answers.length; i++) {
            clonedData[i].date = date2;
        }
        setAnswers(clonedData);

        for (i = 0; i < answers.length; i++) {
            updateAnswersAPIMethod(answers[i]).then(
                console.log("saved answer")
            );
        }
    }


    const handlePrevDate = () => {
        /* setDate2(date2.setDate(date2.getDate()-1)); */
        date2.setDate(date2.getDate() - 1);
        console.log("date in prev date: " + `${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`);

        getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then(
            (a) => {
                if (a.length === 0) {
                    console.log("a is length 0 (on prev date)");
                    for (var i = 0; i < questions.length; i++) {
                        const newA = {
                            /* text: "new", */
                            text: "",
                            dateslash: `${date2.getMonth() + 1}/${date2.getDate()}/${date2.getFullYear()}`,
                            datedot: `${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`,
                            qid: questions[i]._id,
                        }
                        createAnswerAPIMethod(newA).then(
                            console.log("saved answer")
                        );
                    }
                    console.log("this should print after saved answer");
                    getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then(
                        (a) => { setAnswers(a); console.dir(a) })
                } else {
                    console.log("a is NOT length 0 (on prev date)");
                    const clonedData = [...a];
                    for (var i = a.length; i < questions.length; i++) {
                        const newA = {
                            /* text: "ng", */
                            text: "",
                            dateslash: `${date2.getMonth() + 1}/${date2.getDate()}/${date2.getFullYear()}`,
                            datedot: `${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`,
                            qid: questions[i]._id,
                        }
                        createAnswerAPIMethod(newA).then(
                            console.log("saved answer")
                        );
                    }
                    getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then(
                        (a) => { setAnswers(a); console.log(answers[0].qid); })
                }
            }
        )
    }

    const handleNextDate = () => {
        if (date2 >= controlDate) {
            return;
        }
        date2.setDate(date2.getDate() + 1);
        console.log("date2 in logdata");
        console.log(date2);
        getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then((q) => {
            setAnswers(q);
        })

    }

    const handleChange = (e, i) => {
        const clonedData = [...answers];
        clonedData[i].text = e.target.value;
        setAnswers(clonedData);
    }

    const findAns = (qid) => {
        const res = answers.findIndex(item => (item.qid === qid));
        return res;
    }

    return (
        <div>
            <IdleTimerContainer></IdleTimerContainer>
            <TopBar />
            <div className='logDataPage'>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <div className='logDataBody'>
                    <div className='logDataHeader'>
                        <span className='material-icons' onClick={handlePrevDate}>chevron_left</span>
                        <h3>{date2.getMonth() + 1 + "/" + date2.getDate() + "/" + date2.getFullYear()}</h3>
                        <span className='material-icons' onClick={handleNextDate}>chevron_right</span>
                    </div>
                    <div className='logDataMiddle'>
                        <form>
                            {console.log(answers)}
                            {(answers !== null && answers.length >= questions.length && answers.length !== 0) && questions.map((question, i) => (
                                <div className='questionContainer'>
                                    <div>
                                        <label htmlFor='inputQuestion'>{question.text}</label>
                                    </div>
                                    <div className={(question.type === "4" || question.type === "2" ? 'nomul' : 'mul')}>
                                        <input id={question.type === "1" ? 'numberQuestion' : 'inputQuestion'} type={question.type === '1' ? 'number' : 'text'} value={answers[findAns(question._id)].text} onChange={(e) => handleChange(e, findAns(question._id))} /> {/* instead of question.answer, use answers[i] */}
                                    </div>

                                    <div className={question.type === "4" ? 'mul' : 'nomul'}>
                                        <input type="radio" name={answers[findAns(question._id)]._id} value='option1' checked={answers[findAns(question._id)].text === 'option1'} onChange={(e) => handleChange(e, findAns(question._id))} /> {question.choices[0]}
                                        <br></br>
                                        <input type="radio" name={answers[findAns(question._id)]._id} value='option2' checked={answers[findAns(question._id)].text === 'option2'} onChange={(e) => handleChange(e, findAns(question._id))} /> {question.choices[1]}
                                        <br></br>
                                        <input type="radio" name={answers[findAns(question._id)]._id} value='option3' checked={answers[findAns(question._id)].text === 'option3'} onChange={(e) => handleChange(e, findAns(question._id))} /> {question.choices[2]}
                                    </div>

                                    <div className={question.type === "2" ? 'bool' : 'nobool'}>
                                        <input type="radio" name={answers[findAns(question._id)]._id} value='true' checked={answers[findAns(question._id)].text === 'true'} onChange={(e) => handleChange(e, findAns(question._id))} /> True
                                        <br></br>
                                        <input type="radio" name={answers[findAns(question._id)]._id} value='false' checked={answers[findAns(question._id)].text === 'false'} onChange={(e) => handleChange(e, findAns(question._id))} /> False
                                    </div>
                                </div>
                            ))}
                            <button id='logDatabtn' type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogData;