"use client";
import React from "react";
import Link from "next/link";
import useUser from "../hooks/useGetUserFromStorage";

const Navbar = () => {
	const { useGetUserFromStorage } = useUser();
	const user: User | undefined = useGetUserFromStorage();

	return (
		<nav className="fixed top-0 left-0 w-full min-h-14 h-max py-3 z-[1000] bg-slate-900 shadow-md shadow-gray-300">
			<ul className="text-white text-xl h-full text-[2.5rem] flex justify-around items-center">
				<li className="outline-none focus:outline-none">
					<Link href="/dashboard" className="outline-none focus:outline-none">
						Inicio
					</Link>
				</li>
				<li className="outline-none focus:outline-none">
					<Link
						href="/dashboard/patients"
						className="outline-none focus:outline-none"
					>
						Pacientes
					</Link>
				</li>
				<li className="outline-none focus:outline-none">
					<Link
						href="/dashboard/add-new-patient"
						className="outline-none focus:outline-none"
					>
						Nuevo
					</Link>
				</li>
				{user && <li>{user.username}</li>}
			</ul>
		</nav>
	);
};

export default Navbar;
