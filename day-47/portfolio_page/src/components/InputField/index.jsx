import React from 'react';
import PropTypes from 'prop-types';
import './InputField.css';

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

function InputField({ id, name, placeholder, type }) {
  return (
    <div className="relative h-full w-full">
      <input
        className="h-full w-full rounded border border-solid border-gray-300 px-4 outline-none focus:border-black"
        type={type}
        id={id}
        placeholder=""
        name={name}
        autoComplete="off"
      />
      <p className="input-placeholder absolute left-4 top-1/2 -translate-y-1/2">
        {placeholder}
      </p>
    </div>
  );
}

export default InputField;
