import IdleTimer from 'react-idle-timer';
import React, { useRef } from 'react';
import { useHistory } from "react-router-dom";
import { logoutUsersAPIMethod } from '../api/client';
import Modal from 'react-modal';

function IdleTimerContainer() {
    const idleTimerRef = useRef(null);
    const history = useHistory();

    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    document.onclick = resetTimer;

    function resetTimer() {
        setTimeout(5000);
    }
    const onIdle = () => {
        logoutUsersAPIMethod().then(() => {
            console.log("LOGGING OUT...");
            history.push('/loginpage');
        })
    }

    return (
        <div>
            <IdleTimer ref={idleTimerRef} timeout={180 * 1000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}

export default IdleTimerContainer;