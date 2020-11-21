import React, {useState, useEffect} from "react";
import axios from '../axios/axios';
import '../App.css';
import './ItemsInMeal';
import ItemsInMeal from "./ItemsInMeal";


const Meals = () =>{

    const [mealList, setMealList] = useState([]);
    const [refreshMealList, setRefreshMealList] = useState(false);

    useEffect(() =>
    {
        axios.get("http://localhost:8090/api/meals")
            .then(response =>
            {
                setMealList(response.data);
            });
    }, [refreshMealList]);

    const onDeleteHandler = (id) => {
        axios.delete("http://localhost:8090/api/meals/"+id)
        let newList = Array.from(mealList);
        newList = newList.filter(element => element.id != id);
        setMealList(newList);
    };
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4 ">
                    <div className="card border-light mt-4">
                        <div className="card-body">
                            <center><a href={"/meals/add"}><button type="button" className="btn btn-outline-secondary">Add new meal</button></a>
                            </center>
                        </div>
                    </div>
                </div>
                {

                    mealList.map(meal => (
                        <div className="col-sm-4 ">
                            <div className="card border-light mt-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                    <h5 className="card-title">{meal.name}</h5>
                                        </div>
                                        <div className="col-6">
                                    <button type="button" className="btn btn-outline-secondary mt-2 float-sm-right" onClick={() => onDeleteHandler(meal.id)}>Delete meal</button>
                                        </div>
                                        </div>
                                    <hr/>
                                    <h5 className="card-title">{meal.calories}kcal total</h5>
                                    <hr/>
                                    <div className="row">
                                        <h5 className="card-title m-2 col" style={{color:"green"}}>{meal.carbs.toFixed(2)}g</h5>
                                        <h5 className="card-title m-2 col" style={{color:"darkcyan"}}>{meal.protein.toFixed(2)}g</h5>
                                        <h5 className="card-title m-2 col" style={{color:"orange"}}>{meal.fats.toFixed(2)}g</h5>
                                    </div>
                                    <div className="row">
                                        <h5 className="card-title col" style={{color:"green"}}>Carbs</h5>
                                        <h5 className="card-title col" style={{color:"darkcyan"}}>Protein</h5>
                                        <h5 className="card-title col" style={{color:"orange"}}>Fats</h5>
                                    </div>

                                            <ItemsInMeal id={meal.id} onMealItemChange={() => setRefreshMealList(!refreshMealList)} />


                                </div>
                            </div>
                        </div>

                    ))
                }

            </div>

        </div>
    );
};
export default Meals;