import React from "react";
import BottomHeader from "./BottomHeader";
import TopHeader from "./TopHeader";

function Header() {
	return (
		<div className="sticky top-0 z-50">
			{/*Top Nav */}
			<TopHeader></TopHeader>
			{/*Bottom Nav */}
			<BottomHeader></BottomHeader>
		</div>
	);
}

export default Header;
