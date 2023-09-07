"use client";
import { forwardRef } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

interface InputSelectProps
	extends React.ClassAttributes<HTMLSelectElement>,
		React.InputHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	success?: string;
	options?: string[];
	labelClassName?: string;
	formConfig?: RegisterOptions<FieldValues>;
	placeholder?: string;
	defaultValue?: string
}

const SelectInput = forwardRef((props: InputSelectProps, meta) => {
	const formContext = useFormContext();

	const {
		error = undefined,
		success = undefined,
		label = "",
		name = "",
		options = [],
		className = "",
		labelClassName = "",
		placeholder = "",
		defaultValue = ""
	} = props as Partial<InputSelectProps>;

	const managedKeys: string[] = [
		"error",
		"success",
		"label",
		"type",
		"className",
		"labelClassName",
		"formConfig",
		"placeholder",
		"defaultValue",
	];
	const nonManagedProps: Partial<InputSelectProps> = {
		...props,
	};

	for (const keyToRemove of managedKeys) {
		if ((nonManagedProps as any)[keyToRemove]) {
			delete (nonManagedProps as any)[keyToRemove];
		}
	}	

	return (
		<div className="relative flex flex-col w-full">
			<label className={` ${labelClassName} text-base text-brown-dark`}>
				{label}{" "}
				{props.formConfig?.required && (
					<span className="text-purple-light">*</span>
				)}
			</label>

			<div
				className={`
          outline-none bg-white border-[0.5px] text-sm font-light rounded-lg flex items-center justify-between p-2 h-12 
          ${
						error && !success
							? "border-red-500 ring-red-500 text-gray-700 focus:ring-[0.5px] focus:ring-red-500"
							: "border-colour-3 text-gray-700 focus:ring-[0.5px] focus:ring-colour-3"
					}

          ${
						success && !error
							? "border-green-600 ring-green-600 text-gray-700 focus:ring-[0.5px] focus:ring-green-600"
							: "border-colour-3 text-gray-700 focus:ring-[0.5px] focus:ring-colour-3"
					}
          ${
						props.formConfig?.disabled &&
						"border-colour-5 text-gray-700 opacity-50"
					}
          ${className}
        `}
			>
				<select
					{...formContext.register(name, props.formConfig)}
					{...nonManagedProps}
					className="w-full outline-none"
					defaultValue={defaultValue}
				>
					<option value="" disabled>
						{placeholder}
					</option>

					{options ? (
						options.map((option: string) => (
							<option key={option} value={option}>
								{option}
							</option>
						))
					) : (
						<option value="none" disabled hidden />
					)}
				</select>
			</div>

			<div className="flex flex-col min-h-[20px]">
				<small
					className={`mt-1 text-xs ${error && "text-red-500"} ${
						success && "text-green-600"
					}`}
				>
					{error || success || ""}
				</small>
			</div>
		</div>
	);
});

SelectInput.displayName = "SelectInput";
export default SelectInput;
