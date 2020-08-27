import { app, powerSaveBlocker, BrowserWindow } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

import secrets = require('../secrets.json');

// set secrets
Object.entries(secrets).map(
  ([key, value]) => (process.env[key] = value as string)
);

// Create the main browser window.
function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    width: 800,
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (process.argv.indexOf('--debug-ui') > -1)
    mainWindow.webContents.openDevTools();

  function lockFullScreen() {
    const id = powerSaveBlocker.start('prevent-display-sleep');
    console.log(`[main] Power Save blocked: ${id}`);

    function stop() {
      if (powerSaveBlocker.isStarted(id)) {
        powerSaveBlocker.stop(id);
        console.log(`[main] Power Save unblocked: ${id}`);
      }
    }

    mainWindow.once('leave-full-screen', () => stop());
    mainWindow.once('close', () => stop());
  }

  mainWindow.on('enter-full-screen', () => lockFullScreen());
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
