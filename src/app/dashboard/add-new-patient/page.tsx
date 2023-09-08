"use client";
import { useState, useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Input";
import SelectInput from "../../components/SelectInput";
import Button, { CancelButton } from "../../components/Button";
import { redirect, useRouter } from "next/navigation";
import addNewPatient from "../../api/addNewPatient";
import getAllUsers from "@/app/api/getAllUsers";
import { today, tomorrow } from "@/app/core/helpters";
import useUserStore from "@/app/api/store/store";

const NewPatient = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [surgeons, setSurgeons] = useState<string[]>([]);
	const [nurses, setNurses] = useState<string[]>([]);

	const user: User | undefined = useUserStore((state) => state.user);
	const router = useRouter();

	const newPatientForm = useForm({
		defaultValues: {
			patientName: "",
			surgery: "",
			surgeryDate: today,
			firstVisit: tomorrow,
			phoneNumber: "",
			surgeon: "",
			address: "",
			notes: "",
			nurse: "",
		},
		mode: "onBlur",
		reValidateMode: "onBlur",
	});

	const populateSurgeons = async () => {
		const users = await getAllUsers();
		const surgeons: User[] | undefined = users?.filter(
			(user: User) => user.userType === "Cirujano",
		);

		const surgeonOptions = surgeons?.map((surgeon: User) => surgeon.username);
		surgeonOptions && setSurgeons(surgeonOptions);
	};

	const populateNurses = async () => {
		const users = await getAllUsers();
		const nurses: User[] | undefined = users?.filter(
			(user: User) => user.userType === "Enfermero",
		);

		const nurseOptions = nurses?.map((nurse: User) => nurse.username);

		nurseOptions && setNurses(nurseOptions);
	};

	useEffect(() => {
		populateSurgeons();
		populateNurses();
	}, []);

	useEffect(() => {
		if (user && user.username === "") {
			redirect("/login");
		}
	}, [user]);

	const submitNewPatient = async (data: FieldValues) => {
		setIsLoading(true);

		const newPatient = {
			patientName: data.patientName,
			surgery: data.surgery,
			surgeryDate: data.surgeryDate,
			firstVisit: data.firstVisit,
			phoneNumber: data.phoneNumber,
			surgeon: data.surgeon,
			address: data.address,
			notes: data.notes,
			nurse: data.nurse,
		};

		await addNewPatient(newPatient as Patient);

		newPatientForm.reset();
		router.push("/dashboard/patients");
	};

	return (
		<FormProvider {...newPatientForm}>
			<form onSubmit={newPatientForm.handleSubmit(submitNewPatient)}>
				<h1>Nuevo Paciente: </h1>
				<div className="my-1">
					<div className="relative flex flex-col my-8 md:px-0">
						<div className="flex w-full gap-2">
							<Input
								name="patientName"
								formConfig={{
									required: "Por favor agregue un nombre al paciente.",
									validate: (input: string) =>
										input.trim() !== "" ||
										"Por favor agregue un nombre al paciente.",
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
										newPatientForm.formState.errors.patientName &&
										newPatientForm.clearErrors("patientName"),
									disabled: isLoading,
								}}
								label="Nombre: "
								placeholder="Paciente"
								type="text"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									newPatientForm.getFieldState("patientName").isTouched &&
									newPatientForm.formState.errors.patientName
										? newPatientForm.formState.errors.patientName.message
										: ""
								}
							/>
							<Input
								name="surgery"
								formConfig={{
									required: "Por favor agregue un tipo de cirugia.",
									validate: (input: string) =>
										input.trim() !== "" ||
										"Por favor agregue un tipo de cirugia.",
									minLength: {
										value: 3,
										message:
											"El nombre de la cirugia debe ser de mas de 3 caracteres.",
									},

									onChange: () =>
										newPatientForm.formState.errors.surgery &&
										newPatientForm.clearErrors("surgery"),
									disabled: isLoading,
								}}
								label="Cirugia: "
								placeholder="Cirugia"
								type="text"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									newPatientForm.getFieldState("surgery").isTouched &&
									newPatientForm.formState.errors.surgery
										? newPatientForm.formState.errors.surgery.message
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
										newPatientForm.formState.errors.surgeon &&
										newPatientForm.clearErrors("surgeon"),
									disabled: isLoading,
								}}
								defaultValue=""
								label="Cirujano: "
								labelClassName="text-sm font-semibold mb-2"
								options={surgeons}
								placeholder="Asigne un cirujano: "
								error={
									newPatientForm.getFieldState("surgeon").isTouched &&
									newPatientForm.formState.errors.surgeon
										? newPatientForm.formState.errors.surgeon.message
										: ""
								}
							/>
							{user?.superadmin && (
								<SelectInput
									name="nurse"
									formConfig={{
										onChange: () =>
											newPatientForm.formState.errors.nurse &&
											newPatientForm.clearErrors("nurse"),
										disabled: isLoading,
									}}
									defaultValue=""
									label="Enfermera: "
									placeholder="Asigne una enfermera: "
									labelClassName="text-sm font-semibold mb-2"
									options={nurses}
									error={
										newPatientForm.getFieldState("nurse").isTouched &&
										newPatientForm.formState.errors.nurse
											? newPatientForm.formState.errors.nurse.message
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
										newPatientForm.formState.errors.surgeryDate &&
										newPatientForm.clearErrors("surgeryDate"),
									disabled: isLoading,
								}}
								label="Fecha de la Operacion: "
								placeholder={new Date().toDateString()}
								type="date"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									newPatientForm.getFieldState("surgeryDate").isTouched &&
									newPatientForm.formState.errors.surgeryDate
										? newPatientForm.formState.errors.surgeryDate.message
										: ""
								}
							/>
							<Input
								name="firstVisit"
								formConfig={{
									required: "Por favor agregue la fecha de la primera visita.",
									onChange: () =>
										newPatientForm.formState.errors.firstVisit &&
										newPatientForm.clearErrors("firstVisit"),
									disabled: isLoading,
								}}
								label="Primera Visita: "
								placeholder={new Date().toDateString()}
								type="date"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									newPatientForm.getFieldState("firstVisit").isTouched &&
									newPatientForm.formState.errors.firstVisit
										? newPatientForm.formState.errors.firstVisit.message
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
									validate: (input: string) =>
										input.trim() !== "" ||
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
										newPatientForm.formState.errors.address &&
										newPatientForm.clearErrors("address"),
									disabled: isLoading,
								}}
								label="Direccion: "
								placeholder="Direccion"
								type="text"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									newPatientForm.getFieldState("address").isTouched &&
									newPatientForm.formState.errors.address
										? newPatientForm.formState.errors.address.message
										: ""
								}
							/>
							<Input
								name="phoneNumber"
								formConfig={{
									required:
										"Por favor agregue el numero de telefono del paciente.",
									validate: (input: string) =>
										input.trim() !== "" ||
										"Por favor agregue el numero de telefono del paciente.",
									onChange: () =>
										newPatientForm.formState.errors.phoneNumber &&
										newPatientForm.clearErrors("phoneNumber"),
									disabled: isLoading,
								}}
								label="Numero de Telefono: "
								placeholder="Formato: 1234-5678"
								type="text"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									newPatientForm.getFieldState("phoneNumber").isTouched &&
									newPatientForm.formState.errors.phoneNumber
										? newPatientForm.formState.errors.phoneNumber.message
										: ""
								}
							/>
						</div>
					</div>

					<div className="relative flex flex-col my-8 md:px-0">
						<div className="flex w-full gap-2">
							<Input
								name="notes"
								formConfig={{
									onChange: () =>
										newPatientForm.formState.errors.notes &&
										newPatientForm.clearErrors("notes"),
									disabled: isLoading,
								}}
								label="Notas: "
								placeholder="Notas sobre el paciente"
								type="text"
								labelClassName="text-sm font-semibold mb-2"
								autoComplete="on"
								error={
									newPatientForm.getFieldState("notes").isTouched &&
									newPatientForm.formState.errors.notes
										? newPatientForm.formState.errors.notes.message
										: ""
								}
							/>
						</div>
					</div>

					<div className="relative flex flex-col my-8 md:px-0">
						<div className="flex w-full gap-2">
							<Button
								type="submit"
								disabled={isLoading || !newPatientForm.formState.isValid}
							>
								Enviar
							</Button>
							<CancelButton
								type="button"
								onClick={() => router.push("/dashboard/patients")}
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

export default NewPatient;
