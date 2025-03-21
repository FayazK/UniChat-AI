import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Expose IPC events to the renderer
const ipcEvents = {
  // Expose the renderer-side IPC modules to allow listening for events from the main process

}

// Custom APIs for renderer
const api = {
  // API for securely storing and retrieving settings
  settings: {
    // API Key management (secure)
    getApiKey: (service) => ipcRenderer.invoke('settings:getApiKey', service),
    getAllApiKeys: () => ipcRenderer.invoke('settings:getAllApiKeys'),
    setApiKey: (service, key) => ipcRenderer.invoke('settings:setApiKey', service, key),
    removeApiKey: (service) => ipcRenderer.invoke('settings:removeApiKey', service),
    
    // General settings management
    get: (key) => ipcRenderer.invoke('settings:get', key),
    set: (key, value) => ipcRenderer.invoke('settings:set', key, value),
    getAll: () => ipcRenderer.invoke('settings:getAll'),
    
    // Backup and restore
    export: () => ipcRenderer.invoke('settings:export'),
    import: (data) => ipcRenderer.invoke('settings:import', data),
    
    // Reset settings
    reset: () => ipcRenderer.invoke('settings:reset')
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
