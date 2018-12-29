import React from "react";

const Button = ({ orderPlaced, placeOrder, newOrder }) => {

    return !orderPlaced ? (
        <button className="btn btn-lg btn-danger" onClick={placeOrder} type="button">
            Place Order
        </button>
    ) : (
            <button className="btn btn-lg btn-warning" onClick={newOrder} type="button">
                New Order
            </button>
        );
};
export default Button;
