import React from "react";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center pt-20">
			<Navbar />
			{children}
		</div>
	);
};

export default DashboardLayout;
