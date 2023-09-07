"use client";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const Home = () => {
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login')
        }
    })

	return <div />;
};

Home.requireAuth = true
export default Home;
