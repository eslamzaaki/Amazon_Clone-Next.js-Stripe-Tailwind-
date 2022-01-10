import NextAuth from "next-auth";
import providers from "next-auth/providers";

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		// ...add more providers here
	],
});
