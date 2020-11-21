import React, {useState, useEffect} from "react";
import axios from '../axios/axios';
import '../App.css';
import StripeCheckout from 'react-stripe-checkout';
import {toast} from 'react-toastify';

const Guides = () =>{

    const [cookbookList, setCookbookList] = useState([]);
    toast.configure();

    useEffect(() =>
    {
        axios.get("http://localhost:8090/api/cookbooks")
            .then(response =>
            {
                setCookbookList(response.data);
            });
    }, );

    async function handleToken(token) {
        toast("Your payment was successful. Enjoy your purchase!");
    }

    return(
        <div className="container">
            <table className="table mt-4">

                    <thead>
                        <td className="table-info col-3 " > Name</td>
                        <td className="table-info col-3 " > Type</td>
                        <td className="table-info col-3 " > Price</td>
                        <td className="table-info col-3 " > Buy</td>
                    </thead>
                {

                    cookbookList.map(cookbook => (
                        <tbody>
                        <tr>
                            <td className="table-info col-3 " > {cookbook.name}</td>
                            <td className="table-info col-3 " > <label className="text-info font-italic">{cookbook.type}</label></td>
                            <td className="table-info col-3 " > {cookbook.price}$ </td>
                            <td className="table-info col-2" > <StripeCheckout stripeKey="pk_test_51Hq2nNKIFEoU3jtynvuTREUaMxw9DW01vxM3zJIoL4nepjsmxf5k8Ir3et6EoBy76hEn8PHncUutbtP5zYMfAbKu00kzoerf6d"
                            token={handleToken}
                            /></td>
                        </tr>

                        </tbody>

                    ))
                }
                <tr>
                </tr>
            </table>
        </div>


    );
};
export default Guides;