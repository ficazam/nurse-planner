import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";

const getAllUsers = async () => {
	try {
        const users: User[] = []
		const userSnap = await getDocs(collection(db, "users"));

        userSnap.forEach((doc) => users.push({...doc.data(), uid: doc.id} as User))
		return users;
	} catch (error) {
		console.error(error);
	}
};

export default getAllUsers;
