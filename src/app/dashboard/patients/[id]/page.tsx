"use client";
import { useState, useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../../../components/Input";
import SelectInput from "../../../components/SelectInput";
import { users } from "../../../../../public/staticData";
import Button, { CancelButton } from "../../../components/Button";
import { redirect, useParams, useRouter } from "next/navigation";
import getOnePatient from "../../../../../lib/getOnePatient";
import useUser from "@/app/hooks/useUser";

const EditPatient = () => {
	const [patient, setPatient] = useState<Patient | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [surgeons, setSurgeons] = useState<string[]>([]);
	const [nurses, setNurses] = useState<string[]>([]);

	const router = useRouter();
	const params = useParams();
	const { getUserFromStorage } = useUser();
	const user = getUserFromStorage();

	const editPatientForm = useForm({
		defaultValues: {
			patientName: patient?.patientName || "",
			surgery: patient?.surgery || "",
			surgeryDate: patient?.surgeryDate || "",
			firstVisit: patient?.firstVisit || "",
			phoneNumber: patient?.phoneNumber || "",
			surgeon: patient?.surgeon || "",
			address: patient?.address || "",
			notes: patient?.notes || "",
			nurse: patient?.nurse || "",
		},
		mode: "onBlur",
		reValidateMode: "onBlur",
	});

	const setPatientHandler = async () => {
		const patientData: Promise<Patient | undefined> = getOnePatient(
			params?.id as string,
		);
		const pnt = await patientData;

		pnt && editPatientForm.reset(pnt as FieldValues);
		setPatient(pnt);
	};

	useEffect(() => {
		if (user.username === "") {
			redirect("/login");
		}
		setPatientHandler();

		const surgeons: User[] = users.filter(
			(user: User) => user.userType === "Cirujano",
		);
		const nurses: User[] = users.filter(
			(user: User) => user.userType === "Enfermero",
		);

		const surgeonOptions = surgeons.map((surgeon: User) => surgeon.username);
		const nurseOptions = nurses.map((nurse: User) => nurse.username);

		setSurgeons(surgeonOptions);
		setNurses(nurseOptions);
	}, []);

	const submitNewPatient = (data: FieldValues) => console.log(data);

	return (
		<FormProvider {...editPatientForm}>
			<form onSubmit={editPatientForm.handleSubmit(submitNewPatient)}>
				<h1>{patient?.patientName}: </h1>
				<div className="my-1">
					<div className="relative flex flex-col my-8 md:px-0">
						<div className="flex w-full gap-2">
							<Input
								name="patientName"
								formConfig={{
									required: "Por favor agregue un nombre al paciente.",
									validate: (name: string) =>
										name !== "" || "Por favor agregue un nombre al paciente.",
									minLength: {
										value: 3,
										message:
											"El nombre del paciente debe ser de mas de 3 caracteres.",
									},
									maxLength: {
										value: 50,
										message:
											"El nombre del paciente debe ser de menos de 50 caracteres.",
									},
									onChange: () =>
										editPatientForm.formState.errors.patientName &&
										editPatientForm.clearErrors("patientName"),
									disabled: isLoading,
								}}
								label="Nombre: "
								placeholder="Paciente"
								type="text"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									editPatientForm.getFieldState("patientName").isTouched &&
									editPatientForm.formState.errors.patientName
										? editPatientForm.formState.errors.patientName.message
										: ""
								}
							/>
							<Input
								name="surgery"
								formConfig={{
									required: "Por favor agregue un tipo de cirugia.",
									validate: (name: string) =>
										name !== "" || "Por favor agregue un tipo de cirugia.",
									minLength: {
										value: 3,
										message:
											"El nombre de la cirugia debe ser de mas de 3 caracteres.",
									},

									onChange: () =>
										editPatientForm.formState.errors.surgery &&
										editPatientForm.clearErrors("surgery"),
									disabled: isLoading,
								}}
								label="Cirugia: "
								placeholder="Cirugia"
								type="text"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									editPatientForm.getFieldState("surgery").isTouched &&
									editPatientForm.formState.errors.surgery
										? editPatientForm.formState.errors.surgery.message
										: ""
								}
							/>
						</div>
					</div>

					<div className="relative flex flex-col my-8 md:px-0">
						<div className="flex w-full gap-2">
							<SelectInput
								name="surgeon"
								formConfig={{
									required: "Por favor agregue un cirujano.",
									onChange: () =>
										editPatientForm.formState.errors.surgeon &&
										editPatientForm.clearErrors("surgeon"),
									disabled: isLoading,
								}}
								label="Cirujano: "
								labelClassName="text-sm font-semibold mb-2"
								options={surgeons}
								error={
									editPatientForm.getFieldState("surgeon").isTouched &&
									editPatientForm.formState.errors.surgeon
										? editPatientForm.formState.errors.surgeon.message
										: ""
								}
							/>
							{user?.superadmin && (
								<SelectInput
									name="nurse"
									formConfig={{
										minLength: {
											value: 3,
											message:
												"El nombre de la enfermera debe ser de mas de 3 caracteres.",
										},

										onChange: () =>
											editPatientForm.formState.errors.nurse &&
											editPatientForm.clearErrors("nurse"),
										disabled: isLoading,
									}}
									label="Enfermera: "
									labelClassName="text-sm font-semibold mb-2"
									options={nurses}
									error={
										editPatientForm.getFieldState("nurse").isTouched &&
										editPatientForm.formState.errors.nurse
											? editPatientForm.formState.errors.nurse.message
											: ""
									}
								/>
							)}
						</div>
					</div>

					<div className="relative flex flex-col my-8 md:px-0">
						<div className="flex w-full gap-2">
							<Input
								name="surgeryDate"
								formConfig={{
									required: "Por favor agregue la fecha de la cirugia.",
									onChange: () =>
										editPatientForm.formState.errors.surgeryDate &&
										editPatientForm.clearErrors("surgeryDate"),
									disabled: isLoading,
								}}
								label="Fecha de la Operacion: "
								placeholder={new Date().toDateString()}
								type="date"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									editPatientForm.getFieldState("surgeryDate").isTouched &&
									editPatientForm.formState.errors.surgeryDate
										? editPatientForm.formState.errors.surgeryDate.message
										: ""
								}
							/>
							<Input
								name="firstVisit"
								formConfig={{
									required: "Por favor agregue la fecha de la primera visita.",
									onChange: () =>
										editPatientForm.formState.errors.firstVisit &&
										editPatientForm.clearErrors("firstVisit"),
									disabled: isLoading,
								}}
								label="Primera Visita: "
								placeholder={new Date().toDateString()}
								type="date"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									editPatientForm.getFieldState("firstVisit").isTouched &&
									editPatientForm.formState.errors.firstVisit
										? editPatientForm.formState.errors.firstVisit.message
										: ""
								}
							/>
						</div>
					</div>

					<div className="relative flex flex-col my-8 md:px-0">
						<div className="flex w-full gap-2">
							<Input
								name="address"
								formConfig={{
									required: "Por favor agregue la direccion del paciente.",
									validate: (name: string) =>
										name !== "" ||
										"Por favor agregue la direccion del paciente.",
									minLength: {
										value: 3,
										message:
											"La direccion del paciente debe ser de mas de 3 caracteres.",
									},
									maxLength: {
										value: 100,
										message:
											"La direccion del paciente debe ser de menos de 100 caracteres.",
									},
									onChange: () =>
										editPatientForm.formState.errors.address &&
										editPatientForm.clearErrors("address"),
									disabled: isLoading,
								}}
								label="Direccion: "
								placeholder="Direccion"
								type="text"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									editPatientForm.getFieldState("address").isTouched &&
									editPatientForm.formState.errors.address
										? editPatientForm.formState.errors.address.message
										: ""
								}
							/>
							<Input
								name="notes"
								formConfig={{
									onChange: () =>
										editPatientForm.formState.errors.notes &&
										editPatientForm.clearErrors("notes"),
									disabled: isLoading,
								}}
								label="Notas: "
								placeholder="Notas"
								type="text"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									editPatientForm.getFieldState("notes").isTouched &&
									editPatientForm.formState.errors.notes
										? editPatientForm.formState.errors.notes.message
										: ""
								}
							/>
						</div>
					</div>

					<div className="relative flex flex-col my-8 md:px-0">
						<div className="flex w-full gap-2">
							<Button
								type="submit"
								disabled={isLoading || !editPatientForm.formState.isValid}
							>
								Enviar
							</Button>
							<CancelButton
								type="button"
								onClick={() => router.push("/patients")}
							>
								Cancelar
							</CancelButton>
						</div>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

export default EditPatient;