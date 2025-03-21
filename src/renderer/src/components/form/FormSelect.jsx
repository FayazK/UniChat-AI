import React from 'react';

/**
 * FormSelect component for dropdown selects
 * 
 * @param {object} props - Component props
 * @param {string} props.id - Select ID
 * @param {string} props.label - Select label
 * @param {array} props.options - Select options array of { value, label } objects
 * @param {string} [props.value] - Selected value
 * @param {function} props.onChange - Select change handler
 * @param {string} [props.helperText] - Helper text displayed below the select
 * @param {boolean} [props.required=false] - Whether the select is required
 * @param {boolean} [props.disabled=false] - Whether the select is disabled
 */
const FormSelect = ({
  id,
  label,
  options,
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="select select-bordered w-full"
        disabled={disabled}
        required={required}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && (
        <label className="label">
          <span className="label-text-alt">{helperText}</span>
        </label>
      )}
    </div>
  );
};

export default FormSelect;
