import React from 'react';

/**
 * Card component for displaying content in a contained box
 * 
 * @param {object} props - Component props
 * @param {string} [props.title] - Card title
 * @param {ReactNode} props.children - Card content
 * @param {ReactNode} [props.actions] - Card actions (buttons, etc.)
 * @param {string} [props.className] - Additional CSS classes
 */
const Card = ({ title, children, actions, className = '' }) => {
  return (
    <div className={`card bg-base-100 shadow-md ${className}`}>
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
    </div>
  );
};

export default Card;
