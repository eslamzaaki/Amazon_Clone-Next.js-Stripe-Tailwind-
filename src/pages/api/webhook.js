import { buffer } from "micro";
import * as admin from "firebase-admin";
import Stripe from "stripe";

//secure connection to firebase from backend
const serviceAccount = require("../../../permissions.json");
const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
	  })
	: admin.app();

//establish connection to stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2020-08-27",
});
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
const fullfillOrder = async (session) => {
	return app
		.firestore()
		.collection("users")
		.doc(session.metadata.email)
		.collection("orders")
		.doc(session.id)
		.set({
			amount: session.amount_total / 100,
			images: JSON.parse(session.metadata.images),
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
		})
		.then(() => {
			console.log(`success order${session.id} `);
		});
};

export default async (req, res) => {
	if (req.method === "POST") {
		const requestBuffer = await buffer(req);
		const payload = requestBuffer;
		const sig = req.headers["stripe-signature"];

		// verify event  posted from stripe
		let event;
		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		} catch (err) {
			console.log(err.message);
			res.status(400).send(`${err.message}`);
		}
		if (event.type === "checkout.session.completed") {
			const session = event.data.object;
			return fullfillOrder(session)
				.then((_) => {
					res.status(200);
				})
				.catch((err) => {
					res.status(400).send(`webhook error ${err.message}`);
				});
		}
	}
};

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
