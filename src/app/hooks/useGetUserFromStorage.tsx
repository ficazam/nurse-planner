import { useEffect, useState } from "react";

const useUsers = () => {
	const useGetUserFromStorage = () => {
		const [user, setUser] = useState<User | undefined>(undefined);

		useEffect(() => {
			const username: string = sessionStorage.getItem("username") || "";
			const userType: string = sessionStorage.getItem("userType") || "";
			const surgeon: string = sessionStorage.getItem("surgeon") || "";
			const superadmin: string = sessionStorage.getItem("superadmin") || "";

			const userData: Partial<User> = {
				username,
				userType: userType as "Administrador" | "Cirujano" | "Enfermero" | "",
				surgeon,
				superadmin: superadmin === "true",
			};

			setUser(userData as User);
		}, []);

		return user;
	};

	const setUserToStorage = (user: User) => {
			sessionStorage.setItem("username", user.username);
			sessionStorage.setItem("userType", user.userType);
			sessionStorage.setItem("surgeon", user.surgeon || "");
			sessionStorage.setItem(
				"superadmin",
				user.superadmin === true ? "true" : "false",
			);
	};

	return { useGetUserFromStorage, setUserToStorage }
};


export default useUsers