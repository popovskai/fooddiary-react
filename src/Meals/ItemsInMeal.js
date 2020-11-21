import React, {useState, useEffect} from "react";
import axios from '../axios/axios';
import '../App.css';
import './ItemsInMeal';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditGrams from "./EditGrams";



const ItemsInMeal = props =>{

    const [itemList, setItemList] = useState([]);
    const [footList, setFoodList] = useState([]);
    const [chosenItem, setChosenItem] = useState("");
    const element = <FontAwesomeIcon icon={faTrashAlt} />
    const [updateValue, setUpdateValue] = useState("");
    const [ddown, setDdown] = useState(0);
    const [gramsField, setGramsField] = useState([]);

    useEffect(() =>
    {
        axios.get("http://localhost:8090/api/meals/all/"+props.id)
            .then(response =>
            {
                setItemList(response.data);

                axios.get("http://localhost:8090/api/food/").then(response2 =>
                {
                    setFoodList(response2.data);
                    setDdown(response2.data[0].id);

                    props.onMealItemChange();
                });
            });
    }, [updateValue]);

    const onDeleteHandler = (id) => {
        axios.post("http://localhost:8090/api/meals/remove/"+props.id+"/"+id).then(response => {
            let newList = Array.from(itemList);
            newList= newList.filter(element => element.id != id);
            setItemList(newList);
            setUpdateValue(updateValue + 1);
        })

            .catch(error => {
                console.log(error);
            })
    };

    const addItemToMeal = () =>
    {
        axios.post("http://localhost:8090/api/meals/" + props.id+"/"+ddown+"/"+gramsField).then(response => {
            console.log(response);
            setUpdateValue(updateValue + 1);
            setGramsField("");
        }).catch(error => {
            console.log(error);
        });
    };
    const editGrams = (newValue, sentId) =>
    {
        axios.patch("http://localhost:8090/api/meals/edit/" +sentId+"/"+newValue).then(response => {
            console.log(response);
            props.onMealItemChange();

        }).catch(error => {
            console.log(error);
        });
    };

    return(
        <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="row">Food items</th>
                        <th scope="row">Quantity</th>
                    </tr>
                    </thead>
                {

                    itemList.map(item => (
                                <tbody>
                                <tr>
                                    <th scope="row"> {item.name}</th>
                                    <th scope="row">
                                        <EditGrams initialValue={item.grams} idSent={item.id} onSaveButtonClicked={(newValue, sentId) => editGrams(newValue, sentId)}/>
                                    </th>
                                    <th scope="row"><a href="#" onClick={() => onDeleteHandler(item.id)}> {element} </a></th>
                                </tr>

                                </tbody>

                    ))
                }
                    <tr>
                    </tr>
                </table>
                <div className="row">
                    <select
                        onChange={e => setDdown(e.currentTarget.value)}
                        className="browser-default custom-select col-8">
                        {
                            footList.map(food => (
                                <option value={food.id} selected={food.id === ddown}>{food.name}</option>
                            ))
                        }
                    </select>

                    <input className="form-control col-4" type="text"  placeholder="Grams"  autoFocus value={gramsField} onChange={(event) => setGramsField(event.target.value)}/>
                </div>
            <div className="row">
            <button className="btn btn-primary btn-sm mt-2" type="submit" onClick={addItemToMeal}>Add item to meal</button>
            </div>
        </div>

    );
};
export default ItemsInMeal;