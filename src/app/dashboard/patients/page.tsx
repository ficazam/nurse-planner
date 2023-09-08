"use client";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import { redirect } from "next/navigation";
import { patientFilterAll } from "../../core/helpters";
import Link from "next/link";
import getAllPatients from "@/app/api/getAllPatients";
import useUser from "@/app/hooks/useGetUserFromStorage";

const Patients = () => {
	const [patientsList, setPatientsList] = useState<Patient[]>([]);
	const { useGetUserFromStorage } = useUser();
	const user: User | undefined = useGetUserFromStorage();

	const setPatients = async () => {
		const patientsData: Promise<Patient[] | undefined> = getAllPatients();
		const patients = await patientsData;

		patients &&
			user &&
			setPatientsList(patientFilterAll(patients, user as User));
	};

	useEffect(() => {
		setPatients();
	}, [user]);

	useEffect(() => {
		if (user && user.username === "") {
			redirect("/login");
		}
	}, [user]);

	return (
		<>
			{patientsList.map((patient: Patient) => (
				<Card key={patient.id}>
					<Link href={`/dashboard/patients/${patient.id}`}>
						<div className="flex flex-col items-start justify-center w-full gap-y-2">
							<h1 className="text-2xl">Paciente: {patient.patientName}</h1>
							<p>
								Cirugia: {patient.surgery} - Dr. {patient.surgeon}
							</p>
							<p>Fecha de la cirugia: {patient.surgeryDate}</p>
							<p>Primera visita: {patient.firstVisit}</p>
							<p>Enfermera Asignada: {patient.nurse}</p>
							<p>Direccion: {patient.address}</p>
							<p>Numero de telefono: {patient.phoneNumber}</p>
							<p>Notas: {patient.notes}</p>
						</div>
					</Link>
				</Card>
			))}
		</>
	);
};

export default Patients;
