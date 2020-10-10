import React, { Component } from "react";
import "../assets/css/ItemList.css";
import Item from "./Item.js";

class Items extends Component {
  render() {
    return this.props.items.map((item) => (
      <Item
        key={item.id}
        uid={this.props.uid}
        item={item}
        thisType={this.props.thisType}
        userType={this.props.userType}
      />
    ));
  }
}

export default Items;
