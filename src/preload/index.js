import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Expose IPC events to the renderer
const ipcEvents = {
  // Expose the renderer-side IPC modules to allow listening for events from the main process

}

// Custom APIs for renderer
const api = {
  // API for storing and retrieving API keys
  settings: {
    getApiKeys: () => ipcRenderer.invoke('settings:getApiKeys'),
    saveApiKeys: (keys) => ipcRenderer.invoke('settings:saveApiKeys', keys)
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('ipcRenderer', ipcEvents)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  window.ipcRenderer = ipcEvents
}
