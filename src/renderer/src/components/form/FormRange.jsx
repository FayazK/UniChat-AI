import React from 'react';

/**
 * FormRange component for range sliders
 * 
 * @param {object} props - Component props
 * @param {string} props.id - Range ID
 * @param {string} props.label - Range label
 * @param {number} [props.min=0] - Minimum value
 * @param {number} [props.max=100] - Maximum value
 * @param {number} [props.step=1] - Step increment
 * @param {number|string} props.value - Current value
 * @param {function} props.onChange - Range change handler
 * @param {string} [props.valueLabel] - Text to display current value (e.g. "50%")
 * @param {string} [props.helperText] - Helper text displayed below the range
 * @param {boolean} [props.disabled=false] - Whether the range is disabled
 */
const FormRange = ({
  id,
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  valueLabel,
  helperText,
  disabled = false,
  ...rest
}) => {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={id}>
        <span className="label-text">{label}</span>
        {valueLabel && <span className="label-text-alt">{valueLabel}</span>}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="range"
        disabled={disabled}
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

export default FormRange;
