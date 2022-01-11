import React from "react";
import Headerr from "../Headerr";
import CheckOutItem from "../CheckOutItem";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const checkOut = () => {
	const items = useSelector(selectItems);
	const total = useSelector(selectTotal);
	const { data: session } = useSession();
	const stripePromise = loadStripe(process.env.stripe_public_key);
	const createCheckOutSession = async () => {
		const stripe = await stripePromise;
		const checkOutSession = await axios.post("/api/create-checkout-session", {
			items,
			email: session.user.email,
		});
		const result = await stripe.redirectToCheckout({
			sessionId: checkOutSession.data.id,
		});
		if (result.error) {
			alert(result.error.message);
		}
	};

	return (
		<div>
			<Headerr></Headerr>
			<h1 className="p-5 mb-2 bg-gray-100 border border-b font-bold text-2xl">
				Shopping Basket
			</h1>
			<main className="bg-gray-100 lg:flex max-w-screen-2xl mx-auto">
				{/*left */}
				<div className="flex  flex-shrink flex-col flex-grow shadow space-y-5">
					<Image
						src="https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png"
						height={250}
						width={1020}
						objectFit="contain"
					/>
					{items.map((item) => {
						return <CheckOutItem item={item} key={item.id}></CheckOutItem>;
					})}
				</div>

				{/*right */}
				{items.length !== 0 ? (
					<div className="text-xl p-5 font-semibold shadow-md whitespace-nowrap">
						<p>
							Subtotal ({items.length} items):{" "}
							<span className="font-bold">{`$${total}`}</span>
						</p>
						<button
							role="link"
							onClick={createCheckOutSession}
							className={
								session
									? "buttonn mt-5 font-semibold w-full "
									: "buttonn mt-5 font-semibold w-full bg-gray-500 border cursor-not-allowed	"
							}
							disabled={!session}
						>
							{!session ? "SIGN IN TO CHECK OUT" : "PROCEED TO CHECK OUT"}
						</button>
					</div>
				) : (
					""
				)}
			</main>
		</div>
	);
};
export default checkOut;
