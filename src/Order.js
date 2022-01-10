import moment from "moment";
import React from "react";
import Currency from "react-currency-formatter";

const Order = ({ order }) => {
	return (
		<div className=" w-full   border-2 rounded-lg	">
			{/*Top */}
			<div className=" bg-gray-100 flex space-x-10 items-center  relative p-2">
				<div className="flex flex-col">
					<p className="font-semibold">ORDER PLACED:</p>
					<p>{moment.unix(order.timestamp).format("DD MMM YYYY")}</p>
				</div>
				<div>
					<p className="font-semibold">TOTAL:</p>
					<Currency quantity={order.amount} currency="GBP"></Currency>
				</div>
				<div className="text-blue-500 whitespace-nowrap self-end w-40 lg:w-72 truncate absolute right-10">
					<p className="font-semibold truncate ">ORDER #{order.id}</p>
					<p>{order.items.length} items</p>
				</div>
			</div>
			{/*bottom */}
			<div className="flex space-x-6 p-4 items-center overflow-x-auto">
				{order.images.map((image) => (
					<img
						key={image}
						className="h-20 object-contain sm:32"
						alt=""
						src={image}
					></img>
				))}
			</div>
		</div>
	);
};

export default Order;
