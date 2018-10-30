import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // Get the data from the URL
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "This manager created this campaign and can create request",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution ( wei )",
        description:
          "You must contribute at least this much wei in order to contribute",
      },
      {
        header: requestCount,
        meta: "Number of Requests",
        description: "A request tries to withdraw money from the campaign",
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description: "Number of people who have already donated to campaigns",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether",
        description: "The balance is how much money this campaign has to use",
      },
    ];

    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <h3> Show CampaignShow</h3>

        {this.renderCards()}
        <ContributeForm />
      </Layout>
    );
  }
}

export default CampaignShow;
