import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Monitor, 
  BellRing, 
  User, 
  Key, 
  LayoutGrid, 
  Database, 
  Bot,
  Webhook,
  HardDrive,
  Lock,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('appearance');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return <AppearanceSettings />;
      case 'account':
        return <AccountSettings />;
      case 'api':
        return <ApiSettings />;
      case 'advanced':
        return <AdvancedSettings />;
      default:
        return <AppearanceSettings />;
    }
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <SettingsIcon size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-base-content/70">Customize your UniChat AI experience</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs for larger screens, dropdown for mobile */}
        <div className="block lg:hidden">
          <div className="dropdown w-full">
            <div tabIndex={0} role="button" className="btn btn-outline w-full m-1 justify-between">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              <ChevronDown size={16} />
            </div>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
              <li><a onClick={() => setActiveTab('appearance')}>Appearance</a></li>
              <li><a onClick={() => setActiveTab('account')}>Account</a></li>
              <li><a onClick={() => setActiveTab('api')}>API Keys</a></li>
              <li><a onClick={() => setActiveTab('advanced')}>Advanced</a></li>
            </ul>
          </div>
        </div>

        <div className="hidden lg:block w-64 shrink-0">
          <ul className="menu bg-base-100 w-full rounded-box shadow-sm">
            <li className="menu-title">Settings</li>
            <li>
              <a 
                className={activeTab === 'appearance' ? 'active' : ''} 
                onClick={() => setActiveTab('appearance')}
              >
                <Moon size={18} />
                Appearance
              </a>
            </li>
            <li>
              <a 
                className={activeTab === 'account' ? 'active' : ''} 
                onClick={() => setActiveTab('account')}
              >
                <User size={18} />
                Account
              </a>
            </li>
            <li>
              <a 
                className={activeTab === 'api' ? 'active' : ''} 
                onClick={() => setActiveTab('api')}
              >
                <Key size={18} />
                API Keys
              </a>
            </li>
            <li>
              <a 
                className={activeTab === 'advanced' ? 'active' : ''} 
                onClick={() => setActiveTab('advanced')}
              >
                <Database size={18} />
                Advanced
              </a>
            </li>
          </ul>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1 bg-base-100 rounded-box shadow-sm p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

const AppearanceSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Appearance</h2>
      
      {/* Theme Selection */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg">Theme</h3>
          <p className="text-base-content/70 mb-4">Choose how UniChat AI looks to you</p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <label className="flex flex-col items-center gap-2 cursor-pointer">
              <input type="radio" name="theme" value="light" className="radio radio-primary" defaultChecked />
              <div className="w-full h-24 border-2 border-base-300 hover:border-primary rounded-lg p-2 flex items-center justify-center bg-base-100">
                <Sun size={24} className="text-amber-500" />
              </div>
              <span>Light</span>
            </label>
            
            <label className="flex flex-col items-center gap-2 cursor-pointer">
              <input type="radio" name="theme" value="dark" className="radio radio-primary" />
              <div className="w-full h-24 border-2 border-base-300 hover:border-primary rounded-lg p-2 flex items-center justify-center bg-neutral text-neutral-content">
                <Moon size={24} className="text-blue-400" />
              </div>
              <span>Dark</span>
            </label>
            
            <label className="flex flex-col items-center gap-2 cursor-pointer">
              <input type="radio" name="theme" value="system" className="radio radio-primary" />
              <div className="w-full h-24 border-2 border-base-300 hover:border-primary rounded-lg p-2 flex items-center justify-center bg-base-200">
                <Monitor size={24} />
              </div>
              <span>System</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Notifications */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg">Notifications</h3>
          <p className="text-base-content/70 mb-4">Control notification settings</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellRing size={20} />
                <span>Enable desktop notifications</span>
              </div>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot size={20} />
                <span>Notify when AI response is ready</span>
              </div>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </div>
          </div>
        </div>
      </div>
      
      {/* Layout Options */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg">Layout</h3>
          <p className="text-base-content/70 mb-4">Customize the user interface</p>
          
          <div className="space-y-4">
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                <span className="label-text">Show welcome screen on startup</span>
              </label>
            </div>
            
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
                <span className="label-text">Remember sidebar state</span>
              </label>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Font size</span>
              </label>
              <input type="range" min="0" max="2" className="range range-primary" step="1" defaultValue="1" />
              <div className="w-full flex justify-between text-xs px-2 mt-1">
                <span>Small</span>
                <span>Medium</span>
                <span>Large</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Account</h2>
      
      {/* User Profile */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg">Profile</h3>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <div className="bg-primary text-primary-content rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold">
                  U
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Display Name</span>
                </label>
                <input type="text" placeholder="Your Name" className="input input-bordered w-full" defaultValue="User" />
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email" className="input input-bordered w-full" defaultValue="user@example.com" disabled />
                <label className="label">
                  <span className="label-text-alt text-success flex items-center gap-1">
                    <Lock size={12} /> Email verified
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Save Profile</button>
          </div>
        </div>
      </div>
      
      {/* Subscription */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="card-title text-lg">Subscription</h3>
            <div className="badge badge-primary">Free Plan</div>
          </div>
          <p className="text-base-content/70 mb-4">Your current plan and usage</p>
          
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Messages</div>
              <div className="stat-value">42</div>
              <div className="stat-desc">of 100 available</div>
              <progress className="progress progress-primary w-full mt-2" value="42" max="100"></progress>
            </div>
          </div>
          
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-outline">View Plans</button>
            <button className="btn btn-primary">Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApiSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">API Keys</h2>
      
      {/* API Keys */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg">Manage API Keys</h3>
          <p className="text-base-content/70 mb-4">Generate and manage your API keys</p>
          
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Last Used</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Development Key</td>
                  <td>2023-05-15</td>
                  <td>Today</td>
                  <td>
                    <button className="btn btn-sm btn-ghost">View</button>
                    <button className="btn btn-sm btn-error">Revoke</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">
              <Key size={16} />
              Generate New Key
            </button>
          </div>
        </div>
      </div>
      
      {/* Webhooks */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg">Webhooks</h3>
          <p className="text-base-content/70 mb-4">Configure integration webhooks</p>
          
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Webhook URL</span>
            </label>
            <div className="join w-full">
              <input type="text" placeholder="https://example.com/webhook" className="input input-bordered join-item w-full" />
              <button className="btn btn-primary join-item">
                <Webhook size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Advanced</h2>
      
      {/* Data Management */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg">Data Management</h3>
          <p className="text-base-content/70 mb-4">Manage your application data</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HardDrive size={20} />
                <span>Local Storage Usage</span>
              </div>
              <span className="text-sm">24.5 MB</span>
            </div>
            
            <div className="alert alert-warning">
              <AlertCircle className="w-5 h-5" />
              <span>Clearing data will remove all your conversation history and cached responses.</span>
            </div>
            
            <div className="card-actions">
              <button className="btn btn-outline btn-error">
                Clear Application Data
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Developer Options */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg">Developer Options</h3>
          <p className="text-base-content/70 mb-4">Advanced settings for developers</p>
          
          <div className="space-y-4">
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="toggle toggle-primary" />
                <span className="label-text">Enable developer mode</span>
              </label>
            </div>
            
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" className="toggle toggle-primary" />
                <span className="label-text">Show console logs</span>
              </label>
            </div>
            
            <div className="collapse collapse-arrow bg-base-300">
              <input type="checkbox" /> 
              <div className="collapse-title font-medium">
                Debug Information
              </div>
              <div className="collapse-content"> 
                <pre className="text-xs bg-base-300 p-2 rounded">
                  {JSON.stringify({
                    version: "0.0.1",
                    platform: "electron",
                    os: "windows",
                    nodeVersion: "16.14.2",
                    electronVersion: "34.2.0"
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
