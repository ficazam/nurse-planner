import { app } from "@/app/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const signUpUser = async (email: string, password: string) => {
	const auth = getAuth(app);    

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
            return user
		})
		.catch((error) => console.error(error.message));
};

export default signUpUser