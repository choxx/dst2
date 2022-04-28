import React from 'react';
import { trim } from 'lodash';

const FormField = (props) => {
  const {
    input, meta, onDropDownChange = () => {}, ...rest
  } = props;

  const dropDownChange = (event) => {
    const {
      input: { name },
    } = props;
    if (onDropDownChange) {
      onDropDownChange({ name, value: event.target.value });
    }
  };

  return (
    <>
      {input.type === 'dropdown' ? (
        <select {...rest} {...input} {...(onDropDownChange ? { onChange: dropDownChange } : {})}>
          {rest.placeholder && <option value="">{rest.placeholder}</option>}
          {rest.data.map((value, key) => (
            <option key={`reduxDropdown${key}`}>{value}</option>
          ))}
        </select>
      ) : null}

      {input.type === 'text' || input.type === 'password' || input.type === 'checkbox' ? (
        <input {...rest} {...input} type={input.type} />
      ) : input.type === 'textarea' ? (
        <textarea {...rest} {...input} />
      ) : null}

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs italic text-right">
          {meta.error}
        </p>
      )}
    </>
  );
};

export const renderField = (props) => <FormField {...props} />;

export const required = (value) => (trim(value) ? undefined : 'Required');

export const number = (value) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
