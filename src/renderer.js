import './app.jsx';
import './index.css';

const button = document.getElementById("testBtn");

button.onclick = () => {
    button.classList.toggle('clicked');

    window.nftapp.testCall();
};