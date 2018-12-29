import React from "react";
import { COURIER_CHARGES, MAX_ALLOWED_PRICE } from '../config/constants';

const OrderDescription = props => {
    const { cartItems } = props;

    const renderOrders = (_orders) => {
        return (
            <React.Fragment>
                {
                    _orders.map((order, index) => (
                        <div className="col-3" key={index} >
                            <div className="card border-info custom-card">
                                <div className="card-header"><h5 className="card-title">Package {++index}</h5></div>
                                <div className="card-body text-info">
                                    <div className="row card-title">
                                        <div className="col-sm-3">Items:</div>
                                        <div className="col-sm-9">{order.items}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">Total Weight :-</div>
                                        <div className="col-sm-6">{order.totalWeigth}(g)</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">Total Price :-</div>
                                        <div className="col-sm-6">${order.totalPrice}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">Courier Price :-</div>
                                        <div className="col-sm-6">${order.courierCharges}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </React.Fragment>
        )
    }

    const multiplePackageOrder = (dataContainer) => {
        /*
            Function to divide packages
        */
        let remainingItems = dataContainer.sortedItems;
        let previousPackages = dataContainer.packages;
        let priceTotal = 0;
        const currentRemainingItems = []
        const currentPackages = []
        remainingItems.forEach(element => {
            let currentItemPrice = Number.parseInt(element.price);
            if (priceTotal <= MAX_ALLOWED_PRICE && currentItemPrice + priceTotal <= MAX_ALLOWED_PRICE) {
                priceTotal += currentItemPrice;
                currentPackages.push(element)
            } else {
                currentRemainingItems.push(element)
            }
        });
        previousPackages.push(currentPackages)
        return { sortedItems: currentRemainingItems, packages: previousPackages }
    }

    const calculateCourierCharges = (totalWeigth) => {
        let courierCharges = 0;
        COURIER_CHARGES.map(charge => {
            if (totalWeigth >= charge.min && totalWeigth < charge.max)
                courierCharges = charge.charge
        });
        return courierCharges;
    }

    const generateOrderData = (cartItems) => {
        const orders = [];
        let sortedItems = cartItems.sort((currentItem, nextItem) => Number.parseInt(nextItem.weight) - Number.parseInt(currentItem.weight));

        let packages = []
        let dataContainer = {};

        // Spliting items aacording to weight and price
        while (sortedItems.length > 0) {
            dataContainer = multiplePackageOrder({ sortedItems, packages });
            sortedItems = dataContainer.sortedItems;
            packages = dataContainer.packages
        }

        // Creating packags 
        dataContainer.packages.map(_package => {
            const packageItems = _package.reduce((total, item) => total + item.itemName + ", ", "");
            const totalWeigth = _package.reduce((total, item) => total + Number.parseInt(item.weight), 0);
            const totalPrice = _package.reduce((total, item) => total + Number.parseInt(item.price), 0);
            orders.push({
                items: packageItems,
                totalWeigth,
                totalPrice,
                courierCharges: calculateCourierCharges(totalWeigth)
            })
        });

        return orders.length ? renderOrders(orders) : null;
    }

    return (
        <React.Fragment>
            {generateOrderData(cartItems)}
        </React.Fragment>
    );
};
export default OrderDescription;
