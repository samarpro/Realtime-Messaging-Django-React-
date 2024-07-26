import React from "react";

function Input(props) {
  const {
    type,
    name = null,
    placeholder = null,
    value,
    className,
    defaultValue,
    onChange,
    onSubmit = null,
    required = false,
  } = props;
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      className={`my-5 p-2 bg-black border-solid w-full items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700
      ${className}`}
      onChange={onChange}
      required={required}
      defaultValue={defaultValue}
    />
  );
}

function InputButton(props) {
  const {
    type,
    name = null,
    text,
    value,
    className,
    defaultValue,
    onClick,
    onSubmit = null,
    required = false,
  } = props;
  return (
    <button
      value={value}
      type={type}
      className={`my-5 p-2 bg-white text-black font-bold border rounded-md ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Input;
export { InputButton };
