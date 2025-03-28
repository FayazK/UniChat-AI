import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import storeManager from './store'

// Global reference to the main window
let mainWindow = null

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

/**
 * Sends an update to the renderer process
 * @param {string} type - The type of update (progress or status)
 * @param {any} data - The update data
 */
function sendUpdate(type, data) {
  if (mainWindow && !mainWindow.isDestroyed()) {
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

    // Register IPC handlers for settings
  // API Keys handlers (secure)
  ipcMain.handle('settings:getApiKey', (_, service) => {
    return storeManager.getApiKey(service)
  })

  ipcMain.handle('settings:getAllApiKeys', () => {
    return storeManager.getAllApiKeys()
  })

  ipcMain.handle('settings:setApiKey', (_, service, key) => {
    storeManager.setApiKey(service, key)
    return true
  })

  ipcMain.handle('settings:removeApiKey', (_, service) => {
    storeManager.removeApiKey(service)
    return true
  })

  // General settings handlers
  ipcMain.handle('settings:get', (_, key) => {
    return storeManager.getSetting(key)
  })

  ipcMain.handle('settings:set', (_, key, value) => {
    storeManager.setSetting(key, value)
    return true
  })

  ipcMain.handle('settings:getAll', () => {
    return storeManager.getSettings()
  })

  // Backup and restore
  ipcMain.handle('settings:export', () => {
    return storeManager.exportSettings()
  })

  ipcMain.handle('settings:import', (_, data) => {
    return storeManager.importSettings(data)
  })

  // Reset settings
  ipcMain.handle('settings:reset', () => {
    storeManager.clearAll()
    return true
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
