const FormInput = ({
  name,
  value,
  inputHandler,
  label,
  type,
  placeholder,
  required,
  keyDownHandler,
}) => {
  return (
    <div className="flex justify-between gap-4 items-center w-full">
      <label className="font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="px-2 focus:outline-none transform focus:scale-102 rounded text-black border-gray-300 border"
        type={type}
        placeholder={placeholder}
        onChange={inputHandler}
        onKeyDown={keyDownHandler}
        value={value}
        required={required}
      ></input>
    </div>
  )
}

export default FormInput
