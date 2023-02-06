import React from 'react';

const Input = ({labelText, type, name, placeholder, onChange}) => {
    return (
        <div>
          <label htmlFor={name} className="block text-sm font-medium text-dark opacity-75">
            {labelText}
          </label>
          <div className="mt-1">
            <input
              type={type}
              name={name}
              id={name}
              onChange={onChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-dark placeholder:opacity-50"
              placeholder={placeholder}
            />
          </div>
        </div>
      )
}

export default Input;