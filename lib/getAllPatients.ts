import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";

const getAllPatients = async () => {
	try {
        const patients: Patient[] = []
		const snapshot = await getDocs(collection(db, "patients"));

        snapshot.forEach((doc) => patients.push({...doc.data(), id: doc.id} as Patient))
		return patients;
	} catch (error) {
		console.error(error);
	}
};

export default getAllPatients;
