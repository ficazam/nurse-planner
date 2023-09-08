import { signOut } from 'next-auth/react';


const signOutUser = () => {
    signOut();
}

export default signOutUser
