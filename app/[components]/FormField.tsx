import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
interface props {
  labelname: string;
  type: string;
  name: string;
  placeholder: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  isSupriseMe: boolean;
  handleSupriseMe: MouseEventHandler<HTMLButtonElement>;
  value: string;
}

function FormField({
  labelname,
  type,
  name,
  placeholder,
  handleChange,
  isSupriseMe,
  handleSupriseMe,
  value,
}: props) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelname}
        </label>
        {isSupriseMe && (
          <button
            type="button"
            onClick={handleSupriseMe}
            className="rounded-[5px] bg-[#ECECF1] py-1 px-2 text-xs font-semibold text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50
        p-3 text-sm text-gray-900 outline-none focus:border-[#4649ff] focus:ring-[#4649ff]"
      />
    </div>
  );
}

export default FormField;
