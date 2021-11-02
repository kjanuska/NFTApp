import './app.jsx';
import './index.css';

window.nftapp.api.receive('from-main', (data) => {
    const responseField = document.getElementById('response');
    responseField.innerText = data['asset_events'][0]['asset']['name'];
});