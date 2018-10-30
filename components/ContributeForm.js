import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async event => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();

      this.setState({ loading: true, errorMessage: "" });

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });

      // Refresh current pages after the transactions has been done
      console.log("Transactions done");
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false, value: "" });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount of Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => {
              this.setState({ value: event.target.value });
            }}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Ooops" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
