import React, { Component } from "react";
import axios from "axios";
import ItemList from "./ItemList.js";
import { Link } from "react-router-dom";

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      uid: 1,
      searchKey: "",
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const key = params.searchKey;
    console.log(key);
    this.setState({ searchKey: key });
  }
  render() {
    return (
      <React.Fragment>
        <p>{this.state.searchKey}</p>
        <ItemList
          itemType="SEARCH"
          key={this.state.searchKey}
          uid={this.state.uid}
        />
        <p>{this.state.searchKey}</p>
      </React.Fragment>
    );
  }
}
