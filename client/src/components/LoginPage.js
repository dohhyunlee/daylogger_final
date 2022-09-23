import { useEffect, useState } from 'react';
import './LoginPage.css';
import { useHistory } from "react-router-dom";
import { createUsersAPIMethod, loginUsersAPIMethod } from '../api/client';


function LoginPage() {

    const [display, setDisplay] = useState(false);
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerErrorMessage, setRegisterErrorMessage] = useState(null);
    const [loginErrorMessage, setLoginErrorMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let history = useHistory();
    const routeChange = () => {
        let path = '/logdata';
        history.push(path);
    }

    const handleLogin = (email, password) => {
        const user = { "email": email, "password": password };
        setLoginErrorMessage(null);
        loginUsersAPIMethod(user).then(() => setIsLoggedIn(true)).catch(err => {
            setLoginErrorMessage("Error: Invalid email and/or password");
            setIsLoggedIn(false);
        });
    }

    const handleRegister = (name, email, password) => {
        const profileURL = "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png";
        const colorScheme = "light";
        const address = { address1: "", address2: "" };
        var admin = false;
        if (name === "admin") {
            admin = true;
        }
        const user = { email, colorScheme, name, password, profileURL, address, admin };
        console.dir(user);
        setRegisterErrorMessage(null);
        createUsersAPIMethod(user).then(() => setIsLoggedIn(true)).catch(err => {
            console.log("invalid register");
            setRegisterErrorMessage("Invalid email and/or password");
            setIsLoggedIn(false);
        });
    }


    useEffect(() => {
        if (isLoggedIn) {
            routeChange();
        } else {
            console.log("user is NOT logged in in profile!");
        }
    }, [isLoggedIn]);

    return (
        <div className='login-page'>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <div className='login-contents'>
                <div className='login-header'>
                    <h1>Day Logger</h1>
                    <h3>Get insights quickly</h3>
                </div>
                <div className='login-form'>
                    <div className='login-innerContainer'>
                        <form>
                            <label htmlFor='email'>Email</label>
                            <input id='email' type='text' onChange={e => setLoginEmail(e.target.value)} autoComplete="off" />
                            <label htmlFor='password'>Password</label>
                            <input id='password' type='text' onChange={e => setLoginPassword(e.target.value)} autoComplete="off" />
                            <div style={{ color: 'red' }}>{loginErrorMessage}</div>
                            <button type='button' id='login-button' onClick={() => handleLogin(loginEmail, loginPassword)}>Login</button>
                            <hr />
                            <div className='login-form-footer'>
                                <button type='button' id='create-account-btn' onClick={() => setDisplay(!display)}>Create New Account</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            {display && (
                <div className='create-new-account-background'>
                    <div className='create-new-account-modal'>
                        <div className='inner-modal'>
                            <div className='create-new-account-modal-header'>
                                <h3>Sign Up</h3>
                                <span className="material-icons" id="signup-close" onClick={() => setDisplay(!display)}>close</span>
                            </div>
                            <label htmlFor="signup-name">Name</label>
                            <input type="text" name="name" id="signup-name" onChange={e => setRegisterName(e.target.value)} autoComplete="off" />
                            <label htmlFor="signup-email">Email</label>
                            <input type="text" name="email" id="signup-email" onChange={e => setRegisterEmail(e.target.value)} autoComplete="off" />
                            <label htmlFor="signup-password">Password</label>
                            <input type="text" name="password" id="signup-password" onChange={e => setRegisterPassword(e.target.value)} autoComplete="off" />
                            <div style={{ color: 'red' }}>{registerErrorMessage}</div>
                            <div className='create-new-account-modal-footer'>
                                <button onClick={() => handleRegister(registerName, registerEmail, registerPassword)} className="signup">Sign up</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoginPage;