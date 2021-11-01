import './app.jsx';
import './index.css';

window.nftapp.api.receive('from-main', (data) => {
    const responseField = document.getElementById('response');
    responseField.innerText = data;
});