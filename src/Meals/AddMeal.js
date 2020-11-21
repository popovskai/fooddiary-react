import React, {useState, useEffect} from "react";
import axios from '../axios/axios'
import {Redirect} from "react-router-dom";

const AddMeal = () =>{

    const [mealNameField, setMealName] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [mealError, setMealError] = useState("");
    const addNewMeal = (e) =>
    {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid) {
            axios.post("http://localhost:8090/api/meals", {name: mealNameField})
                .then(response => {
                    setRedirect(true);
                }).catch(error => {
                console.log(error);
            })
        }
    };
    const goBack = e =>
    {
        e.preventDefault();
        setRedirect(true);
    };

    const formValidation = () => {
        let isValid = true;
        if(mealNameField.trim().length < 2){
            setMealError("Meal name has to be longer than 2 letters");
            isValid = false;
        }
        return isValid;
    }
    return(

        <div className="container">
            { redirect  && <Redirect to={"/meals"}  /> }
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Create new meal</h5>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <label style={{color: "red"}}>{mealError}</label>
                                    <input className="form-control" type="text"  placeholder="Name"  autoFocus value={mealNameField} onChange={(event) => {setMealName(event.target.value); setMealError("")}}/>
                                    <label htmlFor="name">Name</label>
                                </div>
                                <button className="btn btn-primary btn-block" type="submit" onClick={addNewMeal}>Add</button>
                                <button type="button" className="btn btn-secondary btn-block" onClick={goBack}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddMeal;