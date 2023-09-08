import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";

const getUser = async (email: string) => {
	try {
		const userSnap = await getDoc(doc(db, "users", email));
		sessionStorage.setItem('username', userSnap.data()?.username)
		sessionStorage.setItem('userType', userSnap.data()?.userType)
		sessionStorage.setItem('superadmin', userSnap.data()?.superadmin)
		sessionStorage.setItem('surgeon', userSnap.data()?.surgeon)
		return userSnap.data();
	} catch (error) {
		console.error(error);
	}
};

export default getUser;
