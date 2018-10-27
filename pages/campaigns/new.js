import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
  state = {
    minimumContribution: "" // Assuming that always using their input as strings
  };

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    await factory.methods.createCampaign(this.state.minimumContribution).send({
      from: accounts[0]
      // Metamask will automatically specific the gas
    });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        {/* Passing the binding to the submit and not really calling the functions */}
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <lable>Minimum Contribution</lable>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Button primary> Create !</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
