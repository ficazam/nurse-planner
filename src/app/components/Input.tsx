'use client'
import { forwardRef, useState } from 'react';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

interface InputProps
  extends React.ClassAttributes<HTMLInputElement>,
    React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  labelClassName?: string;
  formConfig?: RegisterOptions<FieldValues>;
}

const Input = forwardRef((props: InputProps, meta) => {
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useFormContext();

  const {
    error = undefined,
    success = undefined,
    label = '',
    type = 'text',
    name = '',
    className = '',
    labelClassName = ''
  } = props as Partial<InputProps>;

  const managedKeys: string[] = [
    'error',
    'success',
    'label',
    'type',
    'className',
    'labelClassName',
    'formConfig'
  ];
  const nonManagedProps: Partial<InputProps> = {
    ...props
  };

  for (const keyToRemove of managedKeys) {
    if ((nonManagedProps as any)[keyToRemove]) {
      delete (nonManagedProps as any)[keyToRemove];
    }
  }

  return (
    <div className="relative flex flex-col w-full">
      <label className={` ${labelClassName} text-base text-brown-dark`}>
        {label}{' '}
        {props.formConfig?.required && <span className="text-purple-light">*</span>}
      </label>

      <div
        className={`
          outline-none bg-white border-[0.5px] text-sm font-light rounded-lg flex items-center justify-between p-2 h-12 
          ${
            error && !success
              ? 'border-red-500 ring-red-500 text-gray-700 focus:ring-[0.5px] focus:ring-red-500'
              : 'border-colour-3 text-gray-700 focus:ring-[0.5px] focus:ring-colour-3'
          }

          ${
            success && !error
              ? 'border-green-600 ring-green-600 text-gray-700 focus:ring-[0.5px] focus:ring-green-600'
              : 'border-colour-3 text-gray-700 focus:ring-[0.5px] focus:ring-colour-3'
          }
          ${props.formConfig?.disabled && 'border-lila text-gray-700 opacity-50'}
          ${className}
        `}
      >
        <input
          {...register(name, props.formConfig)}
          {...nonManagedProps}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          className="w-full outline-none"
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => type === 'password' && setShowPassword(!showPassword)}
            className="focus:outline-none flex items-center whitespace-nowrap rounded-r pl-4  py-[0.25rem] text-center text-sm font-normal leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
          >
            {showPassword ? (
              <span className=" text-gray-600 hover:text-colour-4 material-symbols-outlined">
                visibility_off
              </span>
            ) : (
              <span className=" text-gray-600 hover:text-colour-4 material-symbols-outlined">
                visibility
              </span>
            )}
          </button>
        )}
      </div>

      <div className="flex flex-col min-h-[30px] max-w-[200px]">
        <small className={`mt-1 text-xs ${error && 'text-red-500'} ${success && 'text-green-600'}`}>
          {error || success || ''}
        </small>
      </div>
    </div>
  );
});

Input.displayName = 'Input'
export default Input