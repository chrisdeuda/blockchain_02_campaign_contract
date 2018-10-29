import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
  state = {
    minimumContribution: "", // Assuming that always using their input as strings
    errorMessage: "",
    loading: false,
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({
      loading: true,
      errorMessage: "",
    });

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
          // Metamask will automatically specific the gas
        });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        {/* Passing the binding to the submit and not really calling the functions */}
        {/* 
         !! - The first exclactiomation (!) converts the string to it's boolean equvalent .
          If empty it will be false, if contains something. It will be true
          The last exclatiomation ! negatest the result of the previous exclamation
        */}

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
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
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            {" "}
            Create !
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
