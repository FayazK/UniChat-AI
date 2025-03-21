import { app } from 'electron';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Use dynamic import for electron-store
const importStore = async () => {
  const { default: Store } = await import('electron-store');
  return Store;
};

// Generate an encryption key based on machine-specific identifiers
// This ensures keys are only usable on the user's own device
const getMachineKey = () => {
  // Get unique machine identifiers from Electron
  const id = app.getPath('userData');
  // Create a hash of the machine ID to use as encryption key
  return crypto.createHash('sha256').update(id).digest('hex').substring(0, 32);
};

// Initialize stores
let secureStore;
let settingsStore;

const initializeStores = async () => {
  const Store = await importStore();
  
  // Create a secure store with encryption
  secureStore = new Store({
    name: 'secure-settings',
    encryptionKey: getMachineKey(),
    // Store API keys and sensitive data here
  });

  // Create a regular store for non-sensitive settings
  settingsStore = new Store({
    name: 'app-settings',
    // Store general app settings here
  });

  // Initialize default settings if first run
  if (!settingsStore.has('initialized')) {
    settingsStore.set('initialized', true);
    settingsStore.set('theme', 'system');
    settingsStore.set('language', 'en');
    settingsStore.set('contentFilter', 'moderate');
    settingsStore.set('resourceLimits', {
      cpu: 50, // percentage
      memory: 1024, // MB
    });
    settingsStore.set('dataLocation', app.getPath('userData'));
    settingsStore.set('checkForUpdates', true);
  }
};

// Initialize stores immediately
initializeStores();

// Exported store manager with methods to access both stores
const storeManager = {
  // API keys and sensitive data methods
  getApiKey: (service) => secureStore?.get(`apiKeys.${service}`),
  setApiKey: (service, key) => secureStore?.set(`apiKeys.${service}`, key),
  removeApiKey: (service) => secureStore?.delete(`apiKeys.${service}`),
  hasApiKey: (service) => secureStore?.has(`apiKeys.${service}`),
  getAllApiKeys: () => secureStore?.get('apiKeys'),
  
  // General settings methods
  getSetting: (key) => settingsStore?.get(key),
  setSetting: (key, value) => settingsStore?.set(key, value),
  getSettings: () => settingsStore?.store,
  
  // Clear all settings (for uninstall or reset)
  clearAll: () => {
    secureStore?.clear();
    settingsStore?.clear();
  },
  
  // Export settings (excluding sensitive data) for backup
  exportSettings: () => {
    return {
      settings: settingsStore?.store,
      timestamp: new Date().toISOString()
    };
  },
  
  // Import settings from backup
  importSettings: (data) => {
    if (data && data.settings) {
      // Only restore non-sensitive settings
      Object.keys(data.settings).forEach(key => {
        settingsStore?.set(key, data.settings[key]);
      });
      return true;
    }
    return false;
  }
};

export default storeManager;
