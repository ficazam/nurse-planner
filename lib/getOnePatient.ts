import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";

const getOnePatient = async (id: string) => {
	try {
		const patientSnap = await getDoc(doc(db, "patients", id));
		return ({...patientSnap.data(), id: patientSnap.id} as Patient);
	} catch (error) {
		console.error(error);
	}
};

export default getOnePatient;
