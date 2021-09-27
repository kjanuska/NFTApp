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
    event.preventDefault();
    this.setState({text: this.state.address});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitAddress}>
          <h2>Type your address</h2>
          <input id="addressField" type="text" onChange={this.updateAddress}></input>
          <input id="submitBtn" type="submit" value="Submit"></input>
        </form>
        <h2>Your address: {this.state.text}</h2>
      </div>
    );
  }
}

export default Test;
