import React from "react";
import { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import { HomeIcon, UserIcon, MenuIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/client";

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [session] = useSession();
	const router = useRouter();

	return (
		<div>
			<MenuIcon
				onClick={() => setIsSidebarOpen(true)}
				height={30}
				width={40}
				className="link"
			></MenuIcon>
			<div
				onClick={() => setIsSidebarOpen(false)}
				className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-75  ${
					isSidebarOpen ? "block" : "hidden"
				}`}
			/>{" "}
			<div
				className={` text fixed h-full left-0 z-30 w-64
                 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-amazon_blue-light border-r-2 :translate-x-0  ${
										isSidebarOpen
											? "ease-out translate-x-0"
											: "ease-in -translate-x-full"
									}`}
			>
				<Navigation
					activeItemId="/1"
					onSelect={({ itemId }) => {
						// maybe push to the route
						if (itemId == "signIn") {
							signIn();
						} else if (itemId == "signOut") {
							signOut();
						} else {
							setIsSidebarOpen(false);
						}
					}}
					items={[
						{
							title: "Today's Deals",
							itemId: "/1",
							elemBefore: () => <HomeIcon width={20} height={20}></HomeIcon>,
						},
						{
							title: "Customer Service",
							itemId: "/2",
							elemBefore: () => <HomeIcon width={20} height={20}></HomeIcon>,
						},
						{
							title: "Registry",
							itemId: "/3",
							elemBefore: () => <HomeIcon width={20} height={20}></HomeIcon>,
						},
						{
							title: "Gift Cards",
							itemId: "/4",
							elemBefore: () => <HomeIcon width={20} height={20}></HomeIcon>,
						},
						{
							title: "Sell",
							itemId: "/5",
							elemBefore: () => <HomeIcon width={20} height={20}></HomeIcon>,
						},
						{
							title: "Shop Cyber Monday deals",
							itemId: "/6",
							elemBefore: () => <HomeIcon width={20} height={20}></HomeIcon>,
						},

						{
							title: session ? "SIGN OUT" : "SIGN IN",
							itemId: session ? "signOut" : "signIn",
							// you can use your own custom Icon component as well
							// icon is optional
							elemBefore: () => <UserIcon width={20} height={20}></UserIcon>,
						},
					]}
				/>
			</div>
		</div>
	);
};

export default Sidebar;
