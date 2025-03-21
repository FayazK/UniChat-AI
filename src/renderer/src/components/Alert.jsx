import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

/**
 * Alert component for displaying messages
 * 
 * @param {object} props - Component props
 * @param {string} props.type - Alert type (info, success, warning, error)
 * @param {string} props.message - Alert message
 * @param {boolean} [props.dismissable=false] - Whether the alert can be dismissed
 * @param {function} [props.onDismiss] - Callback when alert is dismissed
 */
const Alert = ({ type = 'info', message, dismissable = false, onDismiss }) => {
  if (!message) return null;
  
  const alertClass = `alert ${
    type === 'success' ? 'alert-success' : 
    type === 'warning' ? 'alert-warning' : 
    type === 'error' ? 'alert-error' : 
    'alert-info'
  }`;
  
  const Icon = type === 'success' ? CheckCircle : 
               type === 'error' ? AlertCircle : 
               Info;
  
  return (
    <div role="alert" className={alertClass}>
      <Icon size={18} />
      <span>{message}</span>
      {dismissable && onDismiss && (
        <button onClick={onDismiss} className="btn btn-circle btn-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
