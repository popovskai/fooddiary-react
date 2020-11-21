import React, {useState, useEffect} from "react";
import axios from '../axios/axios'
import {Redirect} from "react-router-dom";

const AddFoodItem = () =>{

    const [itemNameField, setItemName] = useState("");
    const [itemCalsField, setItemCals] = useState("");
    const [itemCarbsField, setItemCarbs] = useState("");
    const [itemProteinField, setItemProtein] = useState("");
    const [itemFatsField, setItemFats] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [nameError, setNameError] = useState("");
    const [calsError, setCalsError] = useState("");
    const [fatsError, setFatsError] = useState("");
    const [protError, setProtError] = useState("");
    const [carbsError, setCarbsError] = useState("");

    const addNewItem = (e) =>
    {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid) {
            axios.post("http://localhost:8090/api/food", {
                name: itemNameField,
                calories: itemCalsField,
                protein: itemProteinField,
                carbs: itemCarbsField,
                fats: itemFatsField
            })
                .then(response => {
                    setRedirect(true);
                }).catch(error => {
                console.log(error);
            })
        }
    };

    const formValidation =() =>{
        let isValid = true;
        if(itemNameField.trim().length < 2){
            setNameError("Food item has to be longer than 2 letters");
            isValid = false;
        }
        if(isNaN(itemCalsField)){
            setCalsError("Please enter a valid number");
            isValid = false;
        }
        if(isNaN(itemProteinField)){
            setProtError("Please enter a valid number");
            isValid = false;
        }
        if(isNaN(itemCarbsField)){
            setCarbsError("Please enter a valid number");
            isValid = false;
        }
        if(isNaN(itemFatsField)){
            setFatsError("Please enter a valid number");
            isValid = false;
        }
        return isValid;
    }
    const goBack = e =>
    {
        e.preventDefault();
        setRedirect(true);
    };
    return(

        <div className="container">
            { redirect  && <Redirect to={"/fooditem"}  /> }
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Add new food item</h5>
                            <div className="alert alert-success" role="alert">
                                Note that total cals and macros are per 100g!
                            </div>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <label style={{color: "red"}}>{nameError}</label>
                                    <input className="form-control" type="text"  placeholder="Name"  autoFocus value={itemNameField} onChange={(event) => {setItemName(event.target.value); setNameError("")}} />
                                    <label htmlFor="name">Name</label>
                                    <div><label style={{color: "red"}}>{calsError}</label></div>
                                    <input className="form-control" type="text"  placeholder="e.g. 72.4"  autoFocus value={itemCalsField} onChange={(event) => {setItemCals(event.target.value); setCalsError("")}}/>
                                    <label htmlFor="name">Calories</label>
                                    <div><label style={{color: "red"}}>{carbsError}</label></div>
                                    <input className="form-control" type="text"  placeholder="e.g. 5"  autoFocus value={itemCarbsField} onChange={(event) => {setItemCarbs(event.target.value); setCarbsError("")}}/>
                                    <label htmlFor="name">Cabrs</label>
                                    <div><label style={{color: "red"}}>{protError}</label></div>
                                    <input className="form-control" type="text"  placeholder="e.g 4.9"  autoFocus value={itemProteinField} onChange={(event) => {setItemProtein(event.target.value); setProtError("")}}/>
                                    <label htmlFor="name">Protein</label>
                                    <div><label style={{color: "red"}}>{fatsError}</label></div>
                                    <input className="form-control" type="text"  placeholder="e.g 3.1"  autoFocus value={itemFatsField} onChange={(event) => {setItemFats(event.target.value); setFatsError("")}}/>
                                    <label htmlFor="name">Fats</label>
                                </div>
                                <button className="btn btn-primary btn-block" type="submit" onClick={addNewItem}>Add</button>
                                <button type="button" className="btn btn-secondary btn-block" onClick={goBack}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddFoodItem;