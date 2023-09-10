type User = {
	uid: string;
	username: string;
	surgeon?: string;
	userType: "Administrador" | "Cirujano" | "Enfermero" | "";
	superadmin: boolean;
	isVerified: boolean
};

type Patient = {
	id: string;
	patientName: string;
	surgery: string;
	surgeryDate: string;
	firstVisit: string;
	phoneNumber: string;
	surgeon: string;
	address: string;
	notes: string;
	nurse?: string;
};
