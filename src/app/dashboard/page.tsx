"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { patientFilterHome, today } from "../core/helpters";
import getAllPatients from "@/app/api/getAllPatients";
import Button from "../components/Button";
import signOutUser from "@/app/api/signOutUser";
import useUserStore from "../api/store/store";

export default function Dashboard() {
	const [patientsList, setPatientsList] = useState<Patient[]>([]);
	const router = useRouter();

	const user: User | undefined = useUserStore((state) => state.user);
	const removeUser = useUserStore((state) => state.removeUser);

	const setPatients = async () => {
		const patientsData: Promise<Patient[] | undefined> = getAllPatients();
		const patients = await patientsData;

		patients &&
			user &&
			setPatientsList(patientFilterHome(patients, user as User));
	};

	const handleSignOut = () => {
		signOutUser();
		removeUser();
		return router.push("/");
	};

	useEffect(() => {
		setPatients();
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<Navbar />
			<div className="h-full w-full py-20 px-10">
				<h1 className="text-2xl">{user?.username}</h1>
				<h1>Hoy, {today}</h1>

				<>
					{patientsList.map((patient: Patient) => (
						<Card key={patient.id}>
							<div className="flex flex-col items-start justify-center w-full gap-y-2">
								<h1 className="text-2xl">Paciente: {patient.patientName}</h1>
								<p>
									Cirugia: {patient.surgery} - Dr. {patient.surgeon}
								</p>
								<p>Direccion: {patient.address}</p>
								<p>Numero de telefono: {patient.phoneNumber}</p>
								<p>Notas: {patient.notes}</p>
							</div>
						</Card>
					))}
				</>
				<Button type="button" onClick={handleSignOut} className="mt-10">
					Cerrar Sesion
				</Button>
			</div>
		</main>
	);
}
