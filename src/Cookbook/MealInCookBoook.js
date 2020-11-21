import React, {useState, useEffect} from "react";
import axios from '../axios/axios';
import '../App.css';




const MealInCookBook = props =>{

    const [mealList, setMealList] = useState([]);
    const [allMeals, setAllMeals] = useState([]);
    const [chosenItem, setChosenItem] = useState("");
    const [updateValue, setUpdateValue] = useState("");
    const [ddown, setDdown] = useState(0);

    useEffect(() =>
    {
        axios.get("http://localhost:8090/api/cookbooks/meals/"+props.id)
            .then(response =>
            {
                setMealList(response.data);

                axios.get("http://localhost:8090/api/meals/").then(response2 =>
                {
                    setAllMeals(response2.data);
                    setDdown(response2.data[0].id);

                   // props.onMealItemChange();
                });
            });
    }, [updateValue]);


    const addMealToGuide = () =>
    {
        axios.post("http://localhost:8090/api/cookbooks/" + props.id+"/"+ddown).then(response => {
            console.log(response);
            setUpdateValue(updateValue + 1);
        }).catch(error => {
            console.log(error);
        });
    };


    return(
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="row">Meals: </th>
                </tr>
                </thead>
                {

                    mealList.map(meal => (
                        <tbody>
                        <tr>
                            <th class="table-success" scope="row"> {meal.name}</th>
                        </tr>

                        </tbody>

                    ))
                }
                <tr>
                </tr>
            </table>
            <div className="row">
                <div className="col-6">
                <select
                    onChange={e => setDdown(e.currentTarget.value)}
                    className="browser-default custom-select col-12">
                    {
                        allMeals.map(am => (
                            <option value={am.id} selected={am.id === ddown}>{am.name}</option>
                        ))
                    }
                </select>
                </div>
                <div className="col-6">
                <button className="btn btn-primary btn-sm" type="submit" onClick={addMealToGuide}>Add meal to guide</button>
                </div>
            </div>

        </div>

    );
};
export default MealInCookBook;