import React, { Component } from "react";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  // It skips the intial rendering without accessing the whole methods
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedContracts().call();

    return { campaigns };
  }
  render() {
    return (
      <div>
        <h1> {this.props.campaigns}</h1>
      </div>
    );
  }
}

export default CampaignIndex;
