const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const sqlite3 = require('better-sqlite3');

// module for storing data
const Store = require('electron-store');
const schema = {
  address: {
    type: 'string',
    default: '',
  }
}
const store = new Store({schema});

// const database = new sqlite3.Database('./public/db.sqlite3', (err) => {
//   if (err) console.error('Database opening error: ', err);
// });

// custom node modules for scraping
const { getActivity } = require('./opensea/activity');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: "#228A9E",
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // once the window is loaded then show it
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.removeMenu();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("submit-address", async (event, address) => {
  store.set('address', address);
});

ipcMain.handle('get-address', async (event) => {
  return store.get('address');
});

ipcMain.on('fetch-data', async (event, address) => {
  const resp = await getActivity(address);
  console.log(resp);
  mainWindow.webContents.send('from-main', resp);
});