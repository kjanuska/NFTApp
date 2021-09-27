const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld(
  'nftapp',
  {
    testCall: () => ipcRenderer.send('testCall')
  }
)