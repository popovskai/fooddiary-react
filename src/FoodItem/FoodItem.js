import React, {useState, useEffect} from "react";
import axios from '../axios/axios';
import '../App.css';


const FoodItem = () =>{

    const [foodList, setFoodList] = useState([]);

    useEffect(() =>
    {
        axios.get("http://localhost:8090/api/food")
            .then(response =>
            {
                setFoodList(response.data);
            });
    }, []);

    const onDeleteHandler = (id) => {
        axios.delete("http://localhost:8090/api/food/"+id)
        let newList = Array.from(foodList);
        newList = newList.filter(element => element.id != id);
        setFoodList(newList);
    };
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4 ">
                    <div className="card border-light mt-4">
                        <div className="card-body">
                            <center><a href={"/fooditem/add"}><button type="button" className="btn btn-outline-secondary">Add new food item</button></a>
                            </center>
                        </div>
                    </div>
                </div>
                {

                    foodList.map(foodItem => (
                        <div className="col-sm-4 ">
                            <div className="card border-light mt-4">
                                <div className="card-body">
                                    <h5 className="card-title">{foodItem.name}</h5>
                                <hr/>
                                    <h7>Nutrition facts for a 100g serving:</h7>
                                    <hr/>
                                    <h5 className="card-title">Total calories: {foodItem.calories}</h5>
                                    <h5 className="card-title" style={{color:"green"}}>Carbs..............................{foodItem.carbs}g</h5>
                                    <h5 className="card-title" style={{color:"darkcyan"}}>Protein...........................{foodItem.protein}g</h5>
                                    <h5 className="card-title" style={{color:"orange"}}>Fats.................................{foodItem.fats}g</h5>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => onDeleteHandler(foodItem.id)}>Delete food item</button>
                                </div>
                            </div>
                        </div>

                    ))
                }

            </div>

        </div>
    );
};
export default FoodItem;