import { forwardRef } from "react";
import { classNames } from "../../utils/utils";

const InputFeild = forwardRef(
  (
    {
      type,
      id,
      label,
      name,
      placeholder = 'place holder',
      autoFocus = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          ref={ref}
          id={id}
          name={name}
          className={classNames(
            `peer rounded h-[50px] w-full text-gray-900`,
            `placeholder-transparent`,
            `text-base`,
            'px-5 pt-4',
            `focus:outline-none`,
            // `focus:outline-1 focus:border-black focus:ring`
          )}
          placeholder={placeholder}
          {...rest}
          autoFocus={autoFocus}
        />
        <label
          htmlFor={id}
          className={classNames(
            `absolute px-5 left-0 top-1 text-[#333] text-[0.75rem] transition-all`,
            `tracking-tight`
            // `peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400`, 
            // `peer-placeholder-shown:top-8`,
            // `peer-focus:top-1 peer-focus:text-gray-600 `,
            // `peer-focus:text-sm`
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
InputFeild.displayName = 'InputFeild';
export default InputFeild;