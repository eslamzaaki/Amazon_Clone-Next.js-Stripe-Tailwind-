import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { addToBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";
const Product = ({
	product: { title, id, category, price, image, description },
}) => {
	const [rating] = useState(Math.floor(Math.random() * 4) + 1);
	const [hasPrime] = useState(Math.floor() < 0.5);
	const dispatch = useDispatch();
	const addToBasketItem = () => {
		dispatch(addToBasket({ title, id, category, price, image, description }));
	};
	return (
		<div className="h-90 space-x-2 flex items-center flex-col p-2 relative m-2 bg-white">
			<p className="absolute top-2 right-2 font-thin	opacity-50 italic">
				{category}
			</p>
			<div className="mt-5 ">
				<Image src={image} height={200} width={200} objectFit="contain"></Image>
			</div>
			<p className="h-10">{title}</p>
			<div className="flex self-start m-5">
				{Array(rating)
					.fill()
					.map((_, i) => {
						return (
							<StarIcon
								key={i}
								color={"yellow"}
								className="h-5 opacity-70"
							></StarIcon>
						);
					})}
			</div>
			<p className="line-clamp-2 m-2 text-xs">{description}</p>

			<div className="self-start mb-5">
				<Currency quantity={price} currency="GBP">
					{price}
				</Currency>
			</div>

			<button
				disabled={false}
				onClick={addToBasketItem}
				className="buttonn w-full"
			>
				Add to Basket
			</button>
		</div>
	);
};

export default Product;
