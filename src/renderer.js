const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;
import './app.jsx';
import './index.css';

ipcRenderer.on('fetched-opensea', (event, message) => {
    console.log('here');
})