import React from "react";

// create a React component that will be rendered later
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.address,
    };
  }

  fetch = (event) => {
    nftapp.api.send('fetch-data', this.state.address);
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <a href="#collection">Collection</a>
          <a href="#transactions">Transactions</a>
          <a href="#analytics">Analytics</a>
        </div>

        <div className="main">
          <h2>Your address is: {this.state.address}</h2>
          <div className="button" onClick={this.fetch}>Fetch</div>
          <p id="response"></p>
        </div>
      </div>
    );
  }
}

export default Main;
