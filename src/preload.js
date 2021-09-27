const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld(
  'nftapp',
  {
    submitAddress: (address) => ipcRenderer.send('submitAddress', address)
  }
)