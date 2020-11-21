import React, {useState, useEffect} from "react";
import axios from '../axios/axios'
import {Redirect} from "react-router-dom";
import ItemsInMeal from "../Meals/ItemsInMeal";

const AddCookBook = () =>{

    const [cookBookName, setCookBookName] = useState("");
    const [cookBookPrice, setPrice] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [types, setTypeList] = useState([]);
    const [ddown, setDdown] = useState(0);
    const [cookError, setCookError] = useState("");
    const [priceError, setPriceError] = useState("");

    useEffect(() =>
    {
        axios.get("http://localhost:8090/api/cookbooks/types")
            .then(response =>
            {
                setTypeList(response.data);
            });
    }, );

    const addNewCookBook = (e) =>
    {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid) {
            axios.post("http://localhost:8090/api/cookbooks", {name: cookBookName, price: cookBookPrice, type: ddown})
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

    const formValidation = () =>{
        let isValid  = true;
        if(cookBookName.trim().length < 2){
            setCookError("Please enter a name that is longer than 2 letters");
            isValid = false;
        }
        if(isNaN(cookBookPrice) || cookBookPrice == '0' || cookBookPrice.length < 1){
            setPriceError("Please enter a price that is a valid number and larger than 0");
            isValid = false;
        }
        return isValid;
    };
    return(

        <div className="container">
            { redirect  && <Redirect to={"/cookbooks"}  /> }
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Create new meal guide</h5>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <div><label style={{color: "red"}}>{cookError}</label></div>
                                    <input className="form-control" type="text"  placeholder="Name"  autoFocus value={cookBookName} onChange={(event) => {setCookBookName(event.target.value); setCookError("")}}/>
                                    <label htmlFor="name">Name</label>
                                    <div><label style={{color: "red"}}>{priceError}</label></div>
                                    <input className="form-control" type="text"  placeholder="Price"  autoFocus value={cookBookPrice} onChange={(event) => {setPrice(event.target.value); setPriceError("")}}/>
                                    <label htmlFor="name">Price</label>
                                </div>
                                <select
                                    onChange={e => setDdown(e.currentTarget.value)}
                                    className="browser-default custom-select col-8">
                                    {
                                        types.map(type => (
                                            <option value={type.valueOf()} selected={type.valueOf() === ddown}>{type.valueOf()}</option>
                                        ))
                                    }
                                </select>
                                <div className="mt-4">
                                <button className="btn btn-primary btn-block" type="submit" onClick={addNewCookBook}>Add</button>
                                <button type="button" className="btn btn-secondary btn-block" onClick={goBack}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddCookBook;