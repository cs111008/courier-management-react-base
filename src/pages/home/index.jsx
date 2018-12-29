import React, { Component } from "react";
import { API_END_POINT } from "../../config/api";
import Table from "../../components/table";
import Pagination from "../../components/pagination";
import OrderDescription from "../../components/order-description";
import Button from "../../components/button";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      cartItems: [],
      orderPlaced: false,
      currentPage: 1,
      itemsPerPage: 10
    };
  }
  componentDidMount() {
    window
      .fetch(API_END_POINT + "/items")
      .then(response => response.json())
      .then(items => {
        const updatedItems = items.map(item => {
          item.selected = false;
          return item;
        });
        this.setState({ items: updatedItems })
      });
  }

  handleItemSelect = (event, item) => {
    const { items } = this.state;

    const _cartItems = items.map(_item => {
      if (_item.id === item.id) {
        _item.selected = !_item.selected;
        return _item
      }
      return _item
    });
    this.setState({ cartItems: _cartItems.filter(cartItem => cartItem.selected), items: _cartItems });
  }

  handleTablePaginationClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handlePlaceOrder = () => {
    const { cartItems } = this.state;
    if (cartItems.length) this.setState({ orderPlaced: true });
  }

  handleNewOrder = () => {
    //Reset items selection
    const { items } = this.state;
    this.setState({ orderPlaced: false, items: items.map(item => { item.selected = false; return item; }) })
  }

  render() {
    const { items, itemsPerPage, currentPage, orderPlaced, cartItems } = this.state;

    // Index Calculation for Pagination
    const startIndex = currentPage === 1 ? currentPage - 1 : (currentPage - 1) * itemsPerPage;
    const secondIndex = currentPage === 1 ? itemsPerPage : itemsPerPage * currentPage;

    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg sticky-top bg-primary justify-content-between">
          <a className="navbar-brand text-white" href="/">
            Courier Management
          </a>
          <form className="form-inline">
            <Button orderPlaced={orderPlaced} placeOrder={this.handlePlaceOrder} newOrder={this.handleNewOrder} />
          </form>
        </nav>
        <div className="row" >
          <div className="col-sm-12 order-container">
            <div className="row mt-3">
              {orderPlaced && cartItems.length ? (
                <OrderDescription cartItems={cartItems} />
              ) : null}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Table items={items.slice(startIndex, secondIndex)} orderPlaced={orderPlaced} handleItemSelect={this.handleItemSelect} />
            <Pagination
              itemLength={Math.ceil(items.length / itemsPerPage)}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              handleTablePaginationClick={this.handleTablePaginationClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
