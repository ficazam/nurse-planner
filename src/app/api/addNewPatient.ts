import { db } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";

const addNewPatient = async (newPatient: Patient) => {
	try {
		const newDoc = await addDoc(collection(db, "patients"), newPatient);

		return newDoc;
	} catch (error) {
		console.error(error);
	}
};

export default addNewPatient;
