import React from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Sidebar from "./Sidebar";
function BottomHeader() {
	return (
		<div>
			<div className="bg-amazon_blue-light p-2 flex items-center space-x-3">
				<div>
					<Sidebar></Sidebar>
				</div>

				<p className="link  hidden md:inline-flex">Today's Deals</p>
				<p className="link  hidden md:inline-flex">Customer Service</p>
				<p className="link  hidden md:inline-flex">Registry</p>
				<p className="link hidden md:inline-flex">Gift Cards</p>
				<p className="link hidden md:inline-flex lg:flex-grow lg:border-none	">
					Sell
				</p>
				<p className="link hidden md:inline-flex">Shop Cyber Monday deals</p>
			</div>
		</div>
	);
}

export default BottomHeader;
