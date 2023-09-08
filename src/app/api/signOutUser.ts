import { signOut } from 'next-auth/react';


const signOutUser = () => {
    signOut();
    sessionStorage.clear()
}

export default signOutUser
