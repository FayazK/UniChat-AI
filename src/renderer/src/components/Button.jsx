import React from 'react';

/**
 * Button component using daisyUI
 * 
 * @param {object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant (primary, secondary, accent, info, success, warning, error, neutral, ghost, link)
 * @param {string} [props.size='md'] - Button size (xs, sm, md, lg, xl)
 * @param {boolean} [props.outline=false] - Whether the button should have an outline style
 * @param {ReactNode} [props.icon] - Optional icon to display before button text
 * @param {ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 * @param {function} props.onClick - Click handler
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  outline = false,
  icon,
  children,
  className = '',
  onClick,
  disabled = false,
  ...rest
}) => {
  const baseClasses = 'btn';
  const variantClass = variant ? `btn-${variant}` : '';
  const sizeClass = size ? `btn-${size}` : '';
  const outlineClass = outline ? 'btn-outline' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${outlineClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
