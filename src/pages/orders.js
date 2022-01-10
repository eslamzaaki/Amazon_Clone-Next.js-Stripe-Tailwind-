import { useSession } from "next-auth/client";
import React from "react";
import Headerr from "./Headerr";
import Order from "./Order";
import { getSession } from "next-auth/client";
import { db } from "../app/firebase";
import moment from "moment";
const Orders = ({ orders }) => {
	console.log(orders);
	const [session] = useSession();
	return (
		<div>
			<Headerr></Headerr>
			{session ? (
				<div className="w-full max-w-screen-lg  mx-auto">
					<h1 className="pl-2  text-3xl font-bold border-b-4 border-yellow-100 pb-2 my-6 w-full ">
						YOU HAVE {orders.length} ORDERS
					</h1>
					<main className=" flex flex-col items-center space-y-4">
						{orders.map((order) => (
							<Order key={order.id} order={order}></Order>
						))}
					</main>
				</div>
			) : (
				<h1 className="pl-2 w-full max-w-screen-lg  mx-auto text-3xl font-bold border-b-4 border-yellow-100 pb-2 my-6 w-full ">
					PLEASE LOGIN TO SEE YOU ORDERS
				</h1>
			)}
		</div>
	);
};

export default Orders;

export async function getServerSideProps(context) {
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
	const session = await getSession(context);
	if (!session) {
		return {
			props: {},
		};
	}
	const stripeOrders = await db
		.collection("users")
		.doc(session.user.email)
		.collection("orders")
		.orderBy("timestamp", "desc")
		.get();

	const orders = await Promise.all(
		stripeOrders.docs.map(async (order) => ({
			id: order.id,
			amount: order.data().amount,
			images: order.data().images,
			timestamp: moment(order.data().timestamp.toDate()).unix(),
			items: (
				await stripe.checkout.sessions.listLineItems(order.id, {
					limit: 100,
				})
			).data,
		}))
	);
	console.log("here");
	return {
		props: {
			orders: orders,
		},
	};
}
