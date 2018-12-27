import React, { Component } from "react";
import { API_END_POINT } from "../../config/api";
import Table from "../../components/table";
import Pagination from "../../components/pagination";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      cartItems: [],
      order: [],
      orderPlaced: false,
      currentPage: 1,
      itemsPerPage: 10
    };
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.handleTablePaginationClick = this.handleTablePaginationClick.bind(
      this
    );
    this.placeOrder = this.placeOrder.bind(this);
  }
  componentDidMount() {
    window
      .fetch(API_END_POINT + "/items")
      .then(response => response.json())
      .then(items => this.setState({ items: items }));
  }
  handleItemSelect(event, item) {
    const { cartItems } = this.state;
    const existingItem = cartItems.find(_item => _item.id === item.id);
    if (!existingItem) {
      cartItems.push(item);
      this.setState({ cartItems: cartItems });
    } else {
      const _cartItems = cartItems.filter(_item => _item.id !== item.id);
      this.setState({ cartItems: _cartItems });
    }
  }
  handleTablePaginationClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  placeOrder() {
    const { cartItems } = this.state;
    let totalPrice = 0;
    let totalWeigth = 0;
    let order = {};
    cartItems.map((orderItem, index) => {
      totalPrice += Number.parseInt(orderItem.price);
      totalWeigth += Number.parseInt(orderItem.weight);
    });
    const charges = [
      {
        min: 0,
        max: 200,
        charge: 5
      },
      {
        min: 200,
        max: 500,
        charge: 10
      },
      {
        min: 500,
        max: 1000,
        charge: 15
      },
      {
        min: 1000,
        max: 5000,
        charge: 5
      }
    ];
    if (totalPrice > 250) {
    } else {
      let zzz = 0;
      charges.map(charge => {
        if(totalWeigth >= charge.min && totalWeigth < charge.max)
          zzz = charge.charge
      })
      order.items = cartItems.reduce(
        (total, item) => total + item.itemName + " ",
        ""
      );
      order.weight = totalWeigth;
      order.totalPrice = totalPrice;
      order.courierCharges = zzz;
      console.log('order====>', order);
      
    }
  }
  render() {
    const { items, itemsPerPage, currentPage } = this.state;
    console.log("this.state====>", this.state.cartItems);
    const startIndex =
      currentPage === 1 ? currentPage - 1 : (currentPage - 1) * itemsPerPage;
    const lastIndex =
      currentPage === 1 ? itemsPerPage : itemsPerPage * currentPage;

    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <a className="navbar-brand text-white" href="/">
            Courier Management
          </a>
        </nav>
        <div className="row" />
        <div className="row">
          <div className="col-12">
            <button
              className="btn btn-lg btn-primary justify-content-end custom-btn"
              onClick={this.placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Table items={items} handleItemSelect={this.handleItemSelect} />
            {/*<Pagination
              itemLength={Math.ceil(items.length / itemsPerPage)}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              handleTablePaginationClick={this.handleTablePaginationClick}
            />*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
