import React from 'react';
import ReactDOM from 'react-dom';

// import Test class from file
import Welcome from './display/Welcome'

(async () => {
    const address = await window.nftapp.settings.getAddress;
    ReactDOM.render(<Welcome address={address} />, document.body);
  })();