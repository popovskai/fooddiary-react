import React, {useState} from 'react';
import axios from "../axios/axios";
import {Redirect} from "react-router-dom";

const Login = props => {
    const [usernameField, setUsernameField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState("");
    const login = e =>
    {
        e.preventDefault();

        axios.post("http://localhost:8090/api/users/login", {username: usernameField, password: passwordField})
            .then(response => {
                props.onLogin(response.data.token);
                setRedirect(true);
            })
            .catch(error => {
                setError("Please insert a valid e-mail and password");
                console.log(error);
            })
    };

    return (
        <div className="container">
            { redirect && <Redirect to="/fooditem" /> }
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Најава</h5>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <label style={{color: "red"}}>{error}</label>
                                    <input type="email" id="inputEmail" className="form-control"
                                           placeholder="Email адреса" autoFocus autoFocus value={usernameField} onChange={(event) => setUsernameField(event.target.value)}/>
                                    <label htmlFor="inputEmail">Email адреса</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control"
                                           placeholder="Лозинка"  autoFocus value={passwordField} onChange={(event) => setPasswordField(event.target.value)}/>
                                    <label htmlFor="inputPassword">Лозинка</label>
                                </div>

                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                    <label className="custom-control-label" htmlFor="customCheck1">Запомни
                                        лозинка</label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={login}>Најави се
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;