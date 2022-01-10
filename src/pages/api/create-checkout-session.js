const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
	const { items, email } = req.body;
	const transItem = items.map((item) => ({
		price_data: {
			currency: "usd",
			product_data: {
				name: item.title,
				images: [item.image],
			},
			unit_amount: item.price * 100,
		},
		description: item.description,
		quantity: 1,
	}));
	const session = await stripe.checkout.sessions.create({
		mode: "payment",
		success_url: `${process.env.HOST}/success`,
		cancel_url: `${process.env.HOST}/cancel`,
		line_items: transItem,
		shipping_address_collection: {
			allowed_countries: ["GB", "EG", "US"],
		},
		shipping_rates: [],

		metadata: {
			email: email,
			images: JSON.stringify(items.map((item) => item.image)),
		},
		client_reference_id: `${email}`,
	});

	res.status(200).json({ id: session.id });
};
