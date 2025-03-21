import React from 'react';

/**
 * FormInput component for text input fields
 * 
 * @param {object} props - Component props
 * @param {string} props.id - Input ID
 * @param {string} props.label - Input label
 * @param {string} [props.type='text'] - Input type (text, password, email, etc.)
 * @param {string} [props.placeholder] - Input placeholder
 * @param {string} [props.value] - Input value
 * @param {function} props.onChange - Input change handler
 * @param {string} [props.helperText] - Helper text displayed below the input
 * @param {boolean} [props.required=false] - Whether the input is required
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 */
const FormInput = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  helperText,
  required = false,
  disabled = false,
  ...rest
}) => {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={id}>
        <span className="label-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full"
        disabled={disabled}
        required={required}
        {...rest}
      />
      {helperText && (
        <label className="label">
          <span className="label-text-alt">{helperText}</span>
        </label>
      )}
    </div>
  );
};

export default FormInput;
