import React from 'react';

/**
 * FormCheckbox component for checkbox inputs
 * 
 * @param {object} props - Component props
 * @param {string} props.id - Checkbox ID
 * @param {string} props.label - Checkbox label
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {function} props.onChange - Checkbox change handler
 * @param {string} [props.helperText] - Helper text displayed below the checkbox
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled
 */
const FormCheckbox = ({
  id,
  label,
  checked,
  onChange,
  helperText,
  disabled = false,
  ...rest
}) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-3" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="checkbox"
          disabled={disabled}
          {...rest}
        />
        <span className="label-text">{label}</span>
      </label>
      {helperText && (
        <label className="label">
          <span className="label-text-alt">{helperText}</span>
        </label>
      )}
    </div>
  );
};

export default FormCheckbox;
