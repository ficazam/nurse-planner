export const dateFormatter = (date: Date | undefined) => {
	if (date) return date.toISOString().split("T")[0];
	return "invalid date";
};

export const today: string = dateFormatter(new Date());

export const patientFilterHome = (patients: Patient[], user: User) => {
	return patients
		.filter((patient: Patient) => {
			if (user.userType === "Administrador") {
				return patient.surgeon === user.surgeon;
			}
			if (user.userType === "Cirujano") {
				return patient.surgeon === user.username;
			}
			if (user.userType === "Enfermero") {
				return patient.nurse === user.username;
			}
			return false;
		})
		.filter((patient: Patient) => patient.firstVisit === today);
};

export const patientFilterAll = (patients: Patient[], user: User) => {
	return patients.filter((patient: Patient) => {
		if (user?.superadmin) {
			return true;
		}
		if (user?.userType === "Administrador") {
			return patient.surgeon === user.surgeon;
		}
		if (user?.userType === "Cirujano") {
			return patient.surgeon === user.username;
		}
		if (user?.userType === "Enfermero") {
			return patient.nurse === user.username;
		}

		return false;
	});
};
