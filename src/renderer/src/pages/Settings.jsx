import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Download, Upload, AlertCircle } from 'lucide-react';

const Settings = () => {
  // State for API keys
  const [apiKeys, setApiKeys] = useState({
    gemini: '',
    replicate: ''
  });

  // State for general settings
  const [generalSettings, setGeneralSettings] = useState({
    theme: 'system',
    language: 'en',
    contentFilter: 'moderate',
    resourceLimits: {
      cpu: 50,
      memory: 1024
    },
    dataLocation: '',
    checkForUpdates: true
  });

  // State for form feedback
  const [formStatus, setFormStatus] = useState({
    message: '',
    type: '' // 'success', 'error', 'info'
  });

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Function to load all settings
  const loadSettings = async () => {
    try {
      // Load API keys
      const keys = await window.api.settings.getAllApiKeys() || {};
      setApiKeys({
        gemini: keys.gemini || '',
        replicate: keys.replicate || ''
      });

      // Load general settings
      const settings = await window.api.settings.getAll() || {};
      setGeneralSettings({
        theme: settings.theme || 'system',
        language: settings.language || 'en',
        contentFilter: settings.contentFilter || 'moderate',
        resourceLimits: settings.resourceLimits || { cpu: 50, memory: 1024 },
        dataLocation: settings.dataLocation || '',
        checkForUpdates: settings.checkForUpdates !== undefined ? settings.checkForUpdates : true
      });
    } catch (error) {
      showStatus('Error loading settings: ' + error.message, 'error');
    }
  };

  // Function to save API keys
  const saveApiKeys = async () => {
    try {
      // Save each API key individually for better security
      await window.api.settings.setApiKey('gemini', apiKeys.gemini);
      await window.api.settings.setApiKey('replicate', apiKeys.replicate);

      showStatus('API keys saved successfully', 'success');
    } catch (error) {
      showStatus('Error saving API keys: ' + error.message, 'error');
    }
  };

  // Function to save general settings
  const saveGeneralSettings = async () => {
    try {
      // Save all general settings at once
      await window.api.settings.set('theme', generalSettings.theme);
      await window.api.settings.set('language', generalSettings.language);
      await window.api.settings.set('contentFilter', generalSettings.contentFilter);
      await window.api.settings.set('resourceLimits', generalSettings.resourceLimits);
      await window.api.settings.set('checkForUpdates', generalSettings.checkForUpdates);

      showStatus('Settings saved successfully', 'success');
    } catch (error) {
      showStatus('Error saving settings: ' + error.message, 'error');
    }
  };

  // Function to export settings
  const exportSettings = async () => {
    try {
      const exportData = await window.api.settings.export();
      
      // Create a download for the settings JSON
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `storymagic-settings-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      showStatus('Settings exported successfully', 'success');
    } catch (error) {
      showStatus('Error exporting settings: ' + error.message, 'error');
    }
  };

  // Function to import settings
  const importSettings = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result);
          const result = await window.api.settings.import(data);
          
          if (result) {
            showStatus('Settings imported successfully', 'success');
            // Reload settings to reflect changes
            loadSettings();
          } else {
            showStatus('Failed to import settings: Invalid format', 'error');
          }
        } catch (parseError) {
          showStatus('Error parsing settings file: ' + parseError.message, 'error');
        }
      };
      
      reader.readAsText(file);
    } catch (error) {
      showStatus('Error importing settings: ' + error.message, 'error');
    }
  };

  // Function to reset settings
  const resetSettings = async () => {
    if (window.confirm('Are you sure you want to reset all settings? This cannot be undone.')) {
      try {
        await window.api.settings.reset();
        showStatus('Settings reset successfully', 'success');
        // Reload settings to reflect changes
        loadSettings();
      } catch (error) {
        showStatus('Error resetting settings: ' + error.message, 'error');
      }
    }
  };

  // Helper function to show status messages
  const showStatus = (message, type) => {
    setFormStatus({ message, type });
    // Auto-clear the message after 5 seconds
    setTimeout(() => setFormStatus({ message: '', type: '' }), 5000);
  };

  // Handle API key changes
  const handleApiKeyChange = (service, value) => {
    setApiKeys(prev => ({
      ...prev,
      [service]: value
    }));
  };

  // Handle general settings changes
  const handleSettingChange = (key, value) => {
    setGeneralSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle resource limit changes
  const handleResourceChange = (resource, value) => {
    setGeneralSettings(prev => ({
      ...prev,
      resourceLimits: {
        ...prev.resourceLimits,
        [resource]: value
      }
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Status message */}
      {formStatus.message && (
        <div
          className={`mb-6 p-4 rounded-md flex items-center ${
            formStatus.type === 'success'
              ? 'bg-green-100 text-green-800'
              : formStatus.type === 'error'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          <AlertCircle className="mr-2" size={20} />
          <span>{formStatus.message}</span>
        </div>
      )}

      {/* API Keys Section */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">API Keys</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          These keys are securely encrypted and stored on your machine only.
        </p>

        <div className="space-y-6">
          {/* Google Gemini API Key */}
          <div>
            <label className="block mb-2 font-medium">
              Google Gemini API Key
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
              value={apiKeys.gemini}
              onChange={(e) => handleApiKeyChange('gemini', e.target.value)}
              placeholder="Enter your Google Gemini API key"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Get a Google Gemini API key
              </a>
            </p>
          </div>

          {/* Replicate API Key */}
          <div>
            <label className="block mb-2 font-medium">
              Replicate API Key
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
              value={apiKeys.replicate}
              onChange={(e) => handleApiKeyChange('replicate', e.target.value)}
              placeholder="Enter your Replicate API key"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              <a href="https://replicate.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Get a Replicate API key
              </a>
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={saveApiKeys}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save className="mr-2" size={16} />
              Save API Keys
            </button>
          </div>
        </div>
      </section>

      {/* General Settings Section */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">General Settings</h2>

        <div className="space-y-6">
          {/* Theme Selection */}
          <div>
            <label className="block mb-2 font-medium">Theme</label>
            <select
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
              value={generalSettings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block mb-2 font-medium">Language</label>
            <select
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
              value={generalSettings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              {/* Add more languages as needed */}
            </select>
          </div>

          {/* Content Filter */}
          <div>
            <label className="block mb-2 font-medium">Content Filtering</label>
            <select
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
              value={generalSettings.contentFilter}
              onChange={(e) => handleSettingChange('contentFilter', e.target.value)}
            >
              <option value="strict">Strict (Most Filtered)</option>
              <option value="moderate">Moderate</option>
              <option value="minimal">Minimal (Least Filtered)</option>
            </select>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Controls how strictly content is filtered for story generation.
            </p>
          </div>

          {/* Resource Limits */}
          <div>
            <h3 className="block mb-3 font-medium">Resource Limits</h3>
            
            <div className="mb-4">
              <label className="block mb-1 text-sm">
                CPU Usage: {generalSettings.resourceLimits.cpu}%
              </label>
              <input
                type="range"
                min="10"
                max="90"
                className="w-full"
                value={generalSettings.resourceLimits.cpu}
                onChange={(e) => handleResourceChange('cpu', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm">
                Memory Usage: {generalSettings.resourceLimits.memory}MB
              </label>
              <input
                type="range"
                min="256"
                max="4096"
                step="128"
                className="w-full"
                value={generalSettings.resourceLimits.memory}
                onChange={(e) => handleResourceChange('memory', parseInt(e.target.value))}
              />
            </div>
            
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Adjust to limit resource usage during AI processing.
            </p>
          </div>

          {/* Check for Updates */}
          <div className="flex items-center">
            <input
              id="check-updates"
              type="checkbox"
              className="mr-2"
              checked={generalSettings.checkForUpdates}
              onChange={(e) => handleSettingChange('checkForUpdates', e.target.checked)}
            />
            <label htmlFor="check-updates" className="font-medium">
              Automatically check for updates
            </label>
          </div>

          <div className="mt-6">
            <button
              onClick={saveGeneralSettings}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save className="mr-2" size={16} />
              Save Settings
            </button>
          </div>
        </div>
      </section>

      {/* Backup and Reset Section */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Backup & Reset</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Backup your settings or reset to defaults. Note that API keys will not be included in backups for security.
        </p>

        <div className="flex flex-wrap gap-4">
          {/* Export Settings */}
          <button
            onClick={exportSettings}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Download className="mr-2" size={16} />
            Export Settings
          </button>

          {/* Import Settings */}
          <div>
            <input
              type="file"
              id="import-settings"
              accept=".json"
              className="hidden"
              onChange={importSettings}
            />
            <label
              htmlFor="import-settings"
              className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 cursor-pointer"
            >
              <Upload className="mr-2" size={16} />
              Import Settings
            </label>
          </div>

          {/* Reset Settings */}
          <button
            onClick={resetSettings}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <RefreshCw className="mr-2" size={16} />
            Reset to Defaults
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
