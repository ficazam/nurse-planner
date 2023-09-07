const useUser = () => {
	const getUserFromStorage = () => {
		const username: string = sessionStorage.getItem("username") || "";
		const userType: string = sessionStorage.getItem("userType") || "";
		const surgeon: string = sessionStorage.getItem("surgeon") || "";
		const superadmin: string = sessionStorage.getItem("superadmin") || "";

		const user: Partial<User> = {
			username,
			userType: userType as "Administrador" | "Cirujano" | "Enfermero" | "",
			surgeon,
			superadmin: superadmin === "true",
		};

        console.log(user)
		return user;
	};

    const setUserToStorage = (user: User) => {
        sessionStorage.setItem('username', user.username)
        sessionStorage.setItem('userType', user.userType)
        sessionStorage.setItem('surgeon', user.surgeon || '')
        sessionStorage.setItem('superadmin', user.superadmin === true ? 'true' : 'false')
    }

    return { getUserFromStorage, setUserToStorage }
};

export default useUser;
