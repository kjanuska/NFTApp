import React from "react";

// create a React component that will be rendered later
class Test extends React.Component {
  render() {
    return (
      <div>
        <h2>Example Page</h2>
        <div id="testBtn" className="button">
          Click me
        </div>
        <form>
          <label for="address">Address:</label>
          <input type="text" id="address" name="address"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default Test;
