"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import useUserStore from "./api/store/store";

const Home = () => {
	const user: User | undefined = useUserStore((state) => state.user);

	useEffect(() => {
		if(!user) redirect('/login')
		if(user) redirect('/dashboard')
	}, [user]);

	return <div />;
};

Home.requireAuth = true;
export default Home;
