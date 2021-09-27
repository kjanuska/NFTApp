const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld('nftapp', {
  openseaAPI: {
    submitAddress(address) {
      ipcRenderer.invoke('submit-address', address);
    }
  }
})