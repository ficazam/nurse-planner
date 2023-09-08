import { db } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";

const addNewUser = async (newUser: User) => {
	setDoc(doc(db, "users", newUser.uid), newUser)
		.then((createdUser) => {
			return createdUser
		})
		.catch((error) => {
			console.error(error);
		});
};

export default addNewUser;
