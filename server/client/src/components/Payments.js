/**
 * Created by sanchitgupta001 on 11/06/18.
 */
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

// actions
import * as actions from '../actions';

// Attributes of StripeCheckout:
// amount: Amount required in Cents (By default)
// token: callback function for token sent back by stripe representing the charge
// stripeKey: Publishable Key

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="MERN App"
        description="5$ for 5 Email Credits"
        amount={500}
        token={token => this.props.handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
