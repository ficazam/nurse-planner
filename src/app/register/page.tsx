"use client";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { FieldValues, useForm, FormProvider } from "react-hook-form";
import Input from "../components/Input";
import SelectInput from "../components/SelectInput";
import { redirect, useRouter } from "next/navigation";
import Button, { CancelButton } from "../components/Button";
import signUpUser from "@/app/api/signupUser";
import addNewUser from "@/app/api/addUser";
import getAllUsers from "@/app/api/getAllUsers";
import useUserStore from "../api/store/store";

const Register = () => {
	const [surgeons, setSurgeons] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const registerForm = useForm({
		defaultValues: {
			email: "",
			password: "",
			username: "",
			userType: "",
			surgeon: "",
		},
		mode: "onBlur",
		reValidateMode: "onBlur",
	});

	const user: User | undefined = useUserStore((state) => state.user)
	const setUser = useUserStore((state) => state.setUser)
	const router = useRouter();

	useEffect(() => {
		if (user) redirect("/dashboard");
	}, [user]);

	const registerHandler = async (data: FieldValues) => {
		setIsLoading(true);
		const userData: User = {
			uid: data.email,
			username: data.username,
			userType: data.userType,
			surgeon: data.surgeon || "",
			superadmin: false,
			isVerified: false
		};

		if (registerForm.formState.isValid) {
			setIsLoading(true);
			const signup = await signUpUser(data.email, data.password);
			await addNewUser(userData);

			router.push('/login?q=verify')
			setIsLoading(false)
		}
	};

	const populateSelectOptions = async () => {
		const users: User[] | undefined = await getAllUsers();
		const surgeonOptions = users
			?.filter((user: User) => user.userType === "Cirujano")
			.map((surgeon: User) => surgeon.username);

		setSurgeons(surgeonOptions || []);
	};

	useEffect(() => {
		populateSelectOptions();
	}, []);

	return (
		<Card>
			<FormProvider {...registerForm}>
				<form
					className="w-full h-full"
					onSubmit={registerForm.handleSubmit(registerHandler)}
				>
					<h1>Acceda a su cuenta: </h1>
					<div className="my-8">
						<div className="relative flex flex-col my-8 md:px-0">
							<Input
								name="email"
								formConfig={{
									required: "Por favor use un email correcto.",
									onChange: () =>
										registerForm.formState.errors.email &&
										registerForm.clearErrors("email"),
									disabled: isLoading,
								}}
								label="Email: "
								placeholder="usuario@mail.com"
								type="email"
								labelClassName="text-sm font-semibold"
								autoComplete="on"
								error={
									registerForm.getFieldState("email").isTouched &&
									registerForm.formState.errors.email
										? registerForm.formState.errors.email.message
										: ""
								}
							/>
						</div>

						<div className="relative flex flex-col my-8 md:px-0">
							<Input
								name="password"
								formConfig={{
									required: "Por favor use una contrasena correcta.",
									onChange: () =>
										registerForm.formState.errors.password &&
										registerForm.clearErrors("password"),
									disabled: isLoading,
								}}
								label="Contrasena: "
								placeholder="********"
								type="password"
								labelClassName="text-sm font-semibold"
								autoComplete="on"
								error={
									registerForm.getFieldState("password").isTouched &&
									registerForm.formState.errors.password
										? registerForm.formState.errors.password.message
										: ""
								}
							/>
						</div>
					</div>

					<div className="my-8">
						<div className="relative flex flex-col my-8 md:px-0">
							<Input
								name="username"
								formConfig={{
									required: "Por favor agregue su nombre de usuario.",
									onChange: () =>
										registerForm.formState.errors.username &&
										registerForm.clearErrors("username"),
									disabled: isLoading,
								}}
								label="Nombre de usuario: "
								placeholder="Mi Nombre"
								type="text"
								labelClassName="text-sm font-semibold"
								autoComplete="on"
								error={
									registerForm.getFieldState("username").isTouched &&
									registerForm.formState.errors.username
										? registerForm.formState.errors.username.message
										: ""
								}
							/>
						</div>

						<div className="relative flex flex-col my-8 md:px-0">
							<SelectInput
								name="userType"
								formConfig={{
									required: "Por favor seleccione un tipo de usuario.",
									onChange: () =>
										registerForm.formState.errors.userType &&
										registerForm.clearErrors("userType"),
									disabled: isLoading,
								}}
								label="Tipo de usuario: "
								placeholder="Asigne su tipo de usuario"
								labelClassName="text-sm font-semibold"
								options={["Asistente", "Cirujano", "Enfermero"]}
								error={
									registerForm.getFieldState("userType").isTouched &&
									registerForm.formState.errors.userType
										? registerForm.formState.errors.userType.message
										: ""
								}
							/>
						</div>

						{registerForm.watch("userType") === "Asistente" && (
							<div className="relative flex flex-col my-8 md:px-0">
								<SelectInput
									name="surgeon"
									formConfig={{
										required: "Por favor agregue un cirujano.",
										onChange: () =>
											registerForm.formState.errors.surgeon &&
											registerForm.clearErrors("surgeon"),
										disabled: isLoading,
									}}
									defaultValue=""
									label="Cirujano: "
									labelClassName="text-sm font-semibold mb-2"
									options={surgeons}
									placeholder="Asigne un cirujano: "
									error={
										registerForm.getFieldState("surgeon").isTouched &&
										registerForm.formState.errors.surgeon
											? registerForm.formState.errors.surgeon.message
											: ""
									}
								/>
							</div>
						)}
					</div>
					<div className="relative flex flex-col my-8 md:px-0">
						<div className="flex w-full gap-2">
							<Button
								type="submit"
								disabled={isLoading || !registerForm.formState.isValid}
							>
								Registrarse
							</Button>
							<CancelButton type="button" onClick={() => router.push("/login")}>
								Volver a Login
							</CancelButton>
						</div>
					</div>
				</form>
			</FormProvider>
		</Card>
	);
};

export default Register;
