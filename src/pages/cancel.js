import { useRouter } from "next/router";
import React from "react";
import Headerr from "../Headerr";
const cancel = () => {
	const router = useRouter();
	return (
		<div className="">
			<Headerr></Headerr>
			<div className=" bg-gray-100 flex flex-col  space-y-5 items-center w-full font-semibold text-3xl">
				<h1 className="p-10">ORDER HAS BEEN CANCELED</h1>
				<button
					className="buttonn w-full max-w-screen-md p-1 font-bold "
					onClick={() => router.push("/")}
				>
					RETURN TO HOME
				</button>
			</div>
		</div>
	);
};

export default cancel;
