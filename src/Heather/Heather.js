import React, {useState} from 'react';


const Header = (props) => {


    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href={"/fooditem"}>Food Items</a>
                        <a className="nav-item nav-link" href={"/meals"}>Meals</a>
                        <a className="nav-item nav-link" href={"/cookbooks"}>My Guides</a>
                        <a className="nav-item nav-link" href={"/guides"}>Buy Meal Guides</a>

                    </div>

                </div>

            </nav>
        </header>
    )
}

export default Header;