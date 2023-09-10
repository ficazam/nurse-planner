"use client";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";
import useUserStore from "../api/store/store";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const user: User | undefined = useUserStore((state) => state.user);

	useEffect(() => {
		if (!user) redirect("/login");
		if (!user.isVerified) redirect("/login?q=verify");
	}, [user]);
	return (
		<div className="h-full w-full flex flex-col justify-center items-center pt-20">
			<Navbar />
			{children}
		</div>
	);
};

export default DashboardLayout;
