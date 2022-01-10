import React from "react";
import Headerr from "../Headerr";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const Success = () => {
	const router = useRouter();
	return (
		<div className="">
			<Headerr></Headerr>

			<main className="bg-gray-100 max-w-screen-lg mx-auto h-screen p-2">
				<div className=" flex flex-col items-center bg-white">
					{/* top  */}
					<div className="flex items-center space-y-2  p-1">
						<div className="text-green-500  w-20 m-1 p-1">
							<CheckCircleIcon></CheckCircleIcon>
						</div>
						<h1 className="text-3xl text-black-900 font-bold">
							{" "}
							Thank You, Your order has been Confirmed !
						</h1>
					</div>
					{/*bottom */}
					<div className=" flex flex-col items-center space-y-5 m-2 mt-10">
						<p className="text-l font-semibold">
							Thank you for shopping with us, We will send a confirmation once
							your item has shipped
						</p>
						<button
							className="buttonn w-full  max-w-screen-md mx-auto"
							onClick={() => router.push("/orders")}
						>
							GO TO YOUR ORDERS
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Success;
