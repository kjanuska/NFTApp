import React from "react";

// create a React component that will be rendered later
class Welcome extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      address: this.props.address,
      temp: '',
    };
  }

  updateAddress = (event) => {
    this.setState({temp: event.target.value});
  }

  submitAddress = (event) => {
    this.setState({
      address: this.state.temp,
    });
    nftapp.openseaAPI.submitAddress(this.state.temp);
  }

  render() {
    return (
      <div>
          <h2>Type your address</h2>
          <input type="text" onChange={this.updateAddress}></input>
          <div className="button" onClick={this.submitAddress}>Submit</div>
          <UserAddress address={this.state.address} />
        <p id="response"></p>
      </div>
    );
  }
}

const UserAddress = ({address}) => <h2>Your address: {address}</h2>;

export default Welcome;
