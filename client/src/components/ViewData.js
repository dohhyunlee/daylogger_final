import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import "./ViewData.css";
import { Chart } from "react-google-charts";
import IdleTimerContainer from "./IdleTimerContainer";

import {
    getQAPIMethod,
    getAnswersByQIDAPIMethod, createAnswerAPIMethod, getAnswersAPIMethod, getQByIdAPIMethod, getAnswersByDateAPIMethod
} from "../api/client";

const date = new Date();
const controlDate = new Date();
function ViewData() {

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(null);
    const [toggle, setToggle] = useState(true);
    const [date2, setDate2] = useState(date);
    const [answers2, setAnswers2] = useState(null);


    useEffect(() => {
        getQAPIMethod().then((q) => {
            setQuestions(q);
        })
        getAnswersAPIMethod().then((a) => {
            setAnswers(a.sort((a, b) => a.datedot.localeCompare(b.datedot)));
            setAnswers2(a.sort((a, b) => a.datedot.localeCompare(b.datedot)));
        })
    }, [])


    const seeByQuestions = () => {
        refreshPage();
        setToggle(true);
    }
    const seeByDate = () => {
        setToggle(false);
        date2.setDate(date2.getDate());
        console.log("date2 in logdata");
        console.log(date2);
        getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then((q) => {
            setAnswers(q);
        })
    }

    //answers has all of the answers
    const getMultipleChoiceData = (qid) => {
        var arr = [...answers2];
        arr = arr.filter(item => (item.qid === qid && item.text !== ''));

        //console.log("arr: ");
        //console.dir(arr);

        var theQuestion = questions.filter(q => q._id === qid);
        var ret = [
            [theQuestion[0].choices[0], occurences("option1", arr)],
            [theQuestion[0].choices[1], occurences("option2", arr)],
            [theQuestion[0].choices[2], occurences("option3", arr)],
        ];


        ret = [["", "Number of responses"], ...ret];

        //console.log("ret:");
        //console.dir(ret);
        return ret;

    }

    const getBooleanData = (qid) => {
        var arr = [...answers2];
        console.log('arr:');
        console.dir(arr);
        arr = arr.filter(item => (item.qid === qid && item.text !== ''));


        var ret = [
            ["True", occurences("true", arr)],
            ["False", occurences("false", arr)],
        ];


        ret = [["", "Number of responses"], ...ret];

        //console.log("ret:");
        //console.dir(ret);
        return ret;
    }

    const getNumData = (qid) => {

        var arr = [...answers2];
        arr = arr.filter(item => (item.qid === qid && item.text !== ''));

        var theQuestion = questions.filter(q => q._id === qid);
        var ret = [];

        ret.push(["Date", "Responses"]);
        for (var i = 0; i < arr.length; i++) {
            ret.push([arr[i].datedot, Number(arr[i].text)])
        }

        console.log("ret:");
        console.dir(ret);
        return ret;
    }

    const occurences = (choice, arr) => {
        var count = 0;
        /* arr.forEach(i => {
            console.log(i.text + " === " + choice);
            i.text === choice && count++;
        }); */

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].text === choice) {
                count++;
            }
        }
        return count;
    }

    const downloadDataFile = () => {
        const element = document.createElement("a");
        const data = [];
        const qu = []
        for (var i = 0; i < questions.length; i++) {
            qu.push(questions[i]._id)
            qu.push(questions[i].type);
            qu.push(questions[i].text);
            qu.push(questions[i].choices);
        }
        const an = []
        for (var i = 0; i < answers.length; i++) {
            an.push(answers[i]._id);
            an.push(answers[i].text);
            an.push(answers[i].dateslash);
            an.push(answers[i].datedot);
            an.push(answers[i].qid);
        }
        data.push(qu + "\n" + an);
        const file = new Blob(data, {
            type: "text/csv"
        });
        element.href = URL.createObjectURL(file);
        element.download = "myData.csv";
        document.body.appendChild(element);
        element.click();
    };

    const optionsNum = {
        colors: ["red"],
        chart: {
            title: "Summary of Responses",
        },
        hAxis: {
            title: "Total Population",
            minValue: 0,
        },
        vAxis: {
            title: "Graph1",
        },
        bars: "vertical",
        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };

    const findAns = (qid) => {
        const res = answers.findIndex(item => (item.qid === qid));
        return res;
    }


    const optionsBool = {
        colors: ["#26b579"],
        chart: {
            title: "Summary of Responses",
        },
        hAxis: {
            title: "Total Population",
            minValue: 0,
        },
        vAxis: {
            title: "Graph1",
        },
        bars: "vertical",
        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };
    const optionsMul = {
        colors: ["#4f70ab"],
        chart: {
            title: "Summary of Responses",
        },
        hAxis: {
            title: "Total Population",
            minValue: 0,
        },
        vAxis: {
            title: "Graph1",
        },
        bars: "vertical",
        axes: {
            y: {
                0: { side: "right" },
            },
        },
    };

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

    const handlePrevDate = () => {
        /* setDate2(date2.setDate(date2.getDate()-1)); */
        date2.setDate(date2.getDate() - 1);
        console.log("date in prev date: " + `${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`);
        getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then(
            (a) => {
                if (a.length === 0) {
                    console.log("a is length 0 (on prev date)");
                    console.log("this should print after saved answer");
                    getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then(
                        (a) => { setAnswers(a); console.dir(a) })
                } else {
                    console.log("a is NOT length 0 (on prev date)");
                    getAnswersByDateAPIMethod(`${date2.getMonth() + 1}.${date2.getDate()}.${date2.getFullYear()}`).then(
                        (a) => { setAnswers(a); console.log(answers[0].qid); })
                }
            }
        )
    }

    const refreshPage = () => {
        window.location.reload(false);
    }


    return (
        <div>
            <IdleTimerContainer></IdleTimerContainer>
            <TopBar />
            <div className="viewDataPage">
                <div className="viewDataBody">
                    <div className="viewDataHeader">
                        <span id="viewQ" className="viewByQuestions" onClick={seeByQuestions}>
                            Question
                        </span>
                        <div>
                            <button id="download" onClick={downloadDataFile}>Download Data</button>
                        </div>
                        <span id="viewD" className="viewByDate" onClick={seeByDate}>
                            Date
                        </span>
                    </div>

                    {toggle && (
                        <div className="viewDataByQuestion">
                            {answers !== null && answers2 !== null && questions.map((question, i) => (
                                <div className='viewDataQuestionContainer'>
                                    <div>
                                        <label className="inputQuestion" htmlFor='inputQuestion'>{question.text}</label>
                                    </div>
                                    {question.type === "4" && (
                                        <Chart
                                            chartType="Bar"
                                            width="100%"
                                            height="260px"
                                            data={getMultipleChoiceData(question._id)} //make second argument question._id
                                            options={optionsMul}

                                        />
                                    )}
                                    {question.type === "2" && (
                                        <Chart
                                            chartType="Bar"
                                            width="100%"
                                            height="260px"
                                            data={getBooleanData(question._id)}
                                            options={optionsBool}
                                        />
                                    )}
                                    {question.type === "1" && (
                                        <Chart
                                            chartType="Line"
                                            width="100%"
                                            height="260px"
                                            data={getNumData(question._id)}
                                            options={optionsNum}
                                        />
                                    )}
                                    {question.type === "3" && answers !== null && answers2.map((a, j) => (
                                        <div>
                                            {a.text !== "" && a.qid === question._id && (
                                                <div className='textanswer'>
                                                    <label htmlFor='inputQuestion'>{a.dateslash} {a.text}</label>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                    {!toggle && (
                        <div className="viewDataByDate"> {/* logdatamiddle */}
                            <div className='viewDateDataHeader'>
                                <span className='material-icons' onClick={handlePrevDate}>chevron_left</span>
                                <h3>{date2.getMonth() + 1 + "/" + date2.getDate() + "/" + date2.getFullYear()}</h3>
                                <span className='material-icons' onClick={handleNextDate}>chevron_right</span>
                            </div>
                            {answers === null || answers.length === 0 && (
                                <div className="nodata">No data!</div>
                            )}
                            {(answers !== null && answers.length >= questions.length && answers.length !== 0) && questions.map((question, i) => (
                                <div className='viewDataQuestionContainer'>
                                    <div>
                                        <label htmlFor='inputQuestion'>{question.text}</label>
                                    </div>
                                    <div className={(question.type === "4" || question.type === "2" ? 'nomul' : 'mul')}>
                                        {answers[findAns(question._id)].text}
                                    </div>
                                    <div className={question.type === "4" ? 'mul' : 'nomul'}>
                                        <input type="radio" name='option' value='option1' checked={answers[findAns(question._id)].text === 'option1'} /> {question.choices[0]}
                                        <br></br>
                                        <input type="radio" name='option' value='option2' checked={answers[findAns(question._id)].text === 'option2'} /> {question.choices[1]}
                                        <br></br>
                                        <input type="radio" name='option' value='option3' checked={answers[findAns(question._id)].text === 'option3'} /> {question.choices[2]}
                                    </div>
                                    <div className={question.type === "2" ? 'bool' : 'nobool'}>
                                        <input type="radio" name='tf' value='true' checked={answers[findAns(question._id)].text === 'true'} /> True
                                        <br></br>
                                        <input type="radio" name='tf' value='false' checked={answers[findAns(question._id)].text === 'false'} /> False
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewData;