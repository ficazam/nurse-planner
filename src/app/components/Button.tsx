import React from "react";
import { motion } from "framer-motion";

const Button = (
	props: Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>,
) => {
	return (
		<motion.button
			type={props.type}
			onClick={(e) => props.onClick?.(e)}
			className={`bg-slate-800 border border-white text-white h-14 w-32 rounded-md font-semibold ${props.disabled && 'cursor-not-allowed pointer-events-none opacity-50'} ${props.className}`}
			whileHover={props.disabled ? {} : { y: -2 }}
			whileTap={
				props.disabled ? {} : { scale: 0.95, backgroundColor: "#FFF" }
			}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			{props.children}
		</motion.button>
	);
};

export const CancelButton = (props: Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
	return (
		<motion.button
			type={props.type}
			onClick={(e) => props.onClick?.(e)}
			className={`bg-slate-500 border border-white text-colour-6 h-14 w-32 rounded-md font-semibold ${props.className}`}
      whileHover={props.disabled ? {} : { y: -2 }}
			whileTap={
				props.disabled ? {} : { scale: 0.95, backgroundColor: "#000" }
			}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			{props.children}
		</motion.button>
	);
};

export default Button;
