"use client";
import { redirect } from "next/navigation";
import useUser from "./hooks/useGetUserFromStorage";
import { useEffect } from "react";

const Home = () => {
	const { useGetUserFromStorage } = useUser();
	const user: User | undefined = useGetUserFromStorage();

	useEffect(() => {
		if (user && user.username === "") {
			redirect("/login");
		} else {
			redirect("/dashboard");
		}
	}, [user]);

	return <div />;
};

Home.requireAuth = true;
export default Home;
