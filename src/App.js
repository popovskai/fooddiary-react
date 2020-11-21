import './App.css';
import FoodItem from "./FoodItem/FoodItem";
import AddFoodItem from "./FoodItem/AddFoodItem"
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Header from "./Heather/Heather";
import Meals from "./Meals/Meals";
import AddMeal from"./Meals/AddMeal";
import Cookies from 'universal-cookie';
import axios from './axios/axios';
import Login from './Login/Login';
import Register from './Register/Register';
import React, {useState, useEffect} from "react";
import CookBook from "./Cookbook/CookBook";
import AddCookBook from "./Cookbook/AddCookBook";
import Guides from "./Cookbook/Guides";



function App() {

  let cookies = new Cookies();
  let cookieJwt = cookies.get("jwt");
  axios.defaults.headers.common["Authorization"] = cookieJwt;

  const [logged, setLogged] = useState(cookieJwt != undefined);

  const onLoginHandler = (jwtToken) =>
  {
    cookies.set("jwt", jwtToken);
    axios.defaults.headers.common["Authorization"] = jwtToken;
    setLogged(true);
  };
  const onLogOutHandler =() =>{
    cookies.set("jwt", "");
    setLogged(false);
  };
  return (
    <div className="App">
      <Header logged={logged}/>
    <Router>
      {logged === true ?
          <Switch>
      <Route path={"/fooditem"} exact render={() =>
          <FoodItem/>}>
      </Route>
      <Route path={"/fooditem/add"} exact render={() =>
          <AddFoodItem/>}>
      </Route>
        <Route path={"/meals"} exact render={() =>
            <Meals/>}>
        </Route>
      <Route path={"/meals/add"} exact render={() =>
          <AddMeal/>}>
      </Route>
            <Route path={"/cookbooks"} exact render={() =>
                <CookBook/>}>
            </Route>
            <Route path={"/cookbooks/add"} exact render={() =>
                <AddCookBook/>}>
            </Route>
            <Route path={"/guides"} exact render={() =>
                <Guides/>}>
            </Route>
        </Switch>
        :
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Please sign in!</h4>
            <p>In order for you to use the site you have to sign in by clicking the  <a href={"/login"} className="btn btn-outline-info my-2 my-sm-0">Log in</a> button.
              If you don't have an account you can create one by clicking the <a href={"/register"} className="btn btn-outline-info my-2 my-sm-0">Register</a> button</p>

            <hr/>
          </div>
        }
        <Route path={"/login"} exact render={()=>
          <Login onLogin={onLoginHandler}/>}>
        </Route>
      <Route path={"/register"} exact render={()=>
          <Register/>}>
      </Route>
    </Router>
    </div>
  );
}

export default App;
