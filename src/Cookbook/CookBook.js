import React, {useState, useEffect} from "react";
import axios from '../axios/axios';
import '../App.css';
import MealInCookBoook from './MealInCookBoook';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



const CookBook = () =>{

    const [cookbookList, setCookbookList] = useState([]);
    const element = <FontAwesomeIcon icon={faTrashAlt} />

    useEffect(() =>
    {
        axios.get("http://localhost:8090/api/cookbooks/user")
            .then(response =>
            {
                setCookbookList(response.data);
            });
    }, );

    const onDeleteHandler = (id) => {
        axios.delete("http://localhost:8090/api/cookbooks/delete/"+id)
        let newList = Array.from(cookbookList);
        newList = newList.filter(element => element.id != id);
        setCookbookList(newList);
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-4 ">
                    <div className="card border-light mt-4">
                        <div className="card-body">
                            <center><a href={"/cookbooks/add"}><button type="button" className="btn btn-outline-secondary">Create new meal guide</button></a>
                            </center>
                        </div>
                    </div>
                </div>
                {

                    cookbookList.map(cookbook => (
                        <div className="col-sm-4 ">
                            <div className="card border-light mt-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                    <h5 className="card-title">{cookbook.name}</h5>
                                        </div>
                                        <div className="col-6">
                                            <a href="#" className="float-right" onClick={() => onDeleteHandler(cookbook.id)}> {element} </a>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-12">
                                    <h7 className="card-title">Type: {cookbook.type}</h7>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                    <h7 className="card-title">Price: {cookbook.price}$</h7>
                                        </div>
                                    </div>
                                    <MealInCookBoook id={cookbook.id}/>
                                </div>
                            </div>
                        </div>

                    ))
                }

            </div>

        </div>
    );
};
export default CookBook;