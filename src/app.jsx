import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './display/Welcome'
import Main from './display/Main'

(async () => {
    const address = await window.nftapp.settings.getAddress;
    if (address !== '')
    {
      ReactDOM.render(<Main address={address} />, document.body);
    } else 
    {
      console.log("null address");
      ReactDOM.render(<Welcome />, document.body);
    }

  })();