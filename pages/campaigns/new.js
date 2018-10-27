import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input } from "semantic-ui-react";

class CampaignNew extends Component {
  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form>
          <Form.Field>
            <lable>Minimum Contribution</lable>
            <Input label="wei" labelPosition="right" />
          </Form.Field>
          <Button primary> Create !</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
