import React from "react";

// create a React component that will be rendered later
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      text: '',
    };
  }

  updateAddress = (event) => {
    this.setState({address: event.target.value});
  }

  submitAddress = (event) => {
    nftapp.openseaAPI.submitAddress(this.state.address);
    this.setState({
      text: this.state.address,
    });
  }


  render() {
    return (
      <div>
          <h2>Type your address</h2>
          <input type="text" onChange={this.updateAddress}></input>
          <div className="button" onClick={this.submitAddress}>Submit</div>
        <h2>Your address: {this.state.text}</h2>
        <p id="response"></p>
      </div>
    );
  }
}

export default Test;
