const { ipcRenderer, contextBridge } = require("electron");
window.require = require;

contextBridge.exposeInMainWorld('nftapp', {
  settings: {
    getAddress: ipcRenderer.invoke('get-address'),
  },

  openseaAPI: {
    submitAddress(address) {
      ipcRenderer.send('submit-address', address);
    }
  },

  // https://stackoverflow.com/questions/48148021/how-to-import-ipcrenderer-in-react/49034244
  api: {
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
})