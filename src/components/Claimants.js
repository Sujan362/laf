import React, { Component } from "react";
import Claimant from "./Claimant.js";
import axios from "axios";

export default class Claimants extends Component {
  state = {};

  render() {
    return this.props.claimants.map((claimant) => (
      <Claimant
        key={claimant.claims_id}
        claimant={claimant}
        itemId={this.props.itemId}
        confirmClaim={this.props.confirmClaim}
        complete_status={this.props.complete_status}
      />
    ));
  }
}
