import React, {useState, useEffect} from "react";
import axios from '../axios/axios'
import {Redirect} from "react-router-dom";

const Register = () =>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [redirect, setRedirect] = useState(false);

    const register = (e) =>
    {
        e.preventDefault();
        axios.post("http://localhost:8090/api/users/register", {username: username, fullName: fullName, password:password})
            .then(response => {
                setRedirect(true);
            }).catch(error => {
            console.log(error);
        })
    };
    const goBack = e =>
    {
        e.preventDefault();
        setRedirect(true);
    };
    return(

        <div className="container">
            { redirect  && <Redirect to={"/login"}  /> }
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Register</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="email" id="inputEmail" className="form-control"
                                               placeholder="Email address"  value={username} onChange={(event) => setUsername(event.target.value)}/>
                                        <label htmlFor="inputEmail">Email address</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="email" id="inputEmail" className="form-control"
                                               placeholder="Full name"  value={fullName} onChange={(event) => setFullName(event.target.value)}/>
                                        <label htmlFor="inputEmail">Full name</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control"
                                               placeholder="Password"   value={password} onChange={(event) => setPassword(event.target.value)}/>
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>

                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={register}>Register
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};
export default Register;