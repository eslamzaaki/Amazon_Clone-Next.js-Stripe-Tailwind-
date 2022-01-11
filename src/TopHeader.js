import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { addProducts, selectItems, selectProducts } from "./slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";

const TopHeader = () => {
	const [searchWord, setSearchWord] = useState("");
	const [searchOrder, setSearchOrder] = useState(true);
	const router = useRouter();
	const { data: session } = useSession();
	const items = useSelector(selectItems);
	const products = useSelector(selectProducts);
	const dispatch = useDispatch();

	useEffect(() => {
		if (searchWord == "") {
			fetch("https://fakestoreapi.com/products")
				.then((res) => res.json())
				.then((filterdProducts) => {
					dispatch(addProducts(filterdProducts));
				});
		} else {
			const filterdProducts2 = products.filter((product) => {
				return (
					product.title.toLowerCase().search(searchWord.toLowerCase()) != -1
				);
			});

			dispatch(addProducts(filterdProducts2));
		}
	}, [searchOrder]);

	return (
		<div className="TopHeader bg-amazon_blue   p-1 py-2 h-20 flex items-center">
			{/*Image ***********************************************/}
			<div
				onClick={() => {
					router.push("/");
				}}
				className="mt-2 flex-grow sm:flex-grow-0 p-1 flex items-center pr-5 pt-3 hover cursor-pointer"
			>
				<Image
					src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
					width={100}
					height={50}
				></Image>
			</div>

			{/*Search ****************************************/}
			<div className="search flex-grow  cursor-pointer  hidden sm:flex items-center">
				<input
					type="text"
					onChange={(event) => {
						setSearchWord(event.target.value);
					}}
					className="rounded-l-md text-md p-2 h-full flex-grow  w-9 focus:outline-none focus:ring-2 focus:ring-red-700"
				/>
				<SearchIcon
					onClick={() => {
						setSearchOrder(!searchOrder);
					}}
					className="h-10 rounded-r-md bg-yellow-400 hover:bg-yellow-500"
				></SearchIcon>
			</div>

			{/*3 Divs ***************************************/}
			<div className="rightHeader text-xs sm:text-sm flex-grow-0 p-0 flex items-center m-2 text-white">
				<div className="div1 cursor-pointer p-2">
					<p>{session ? `Hello ${session.user.name}` : `Hello`}</p>
					<p onClick={session ? signOut : signIn} className="font-bold">
						{session ? "Sign Out" : "Sign In"}
					</p>
				</div>
				<div
					className="div2 cursor-pointer p-2"
					onClick={() => router.push("/orders")}
				>
					<p>Returns</p>
					<p className="font-bold">& Orders</p>
				</div>
				<div
					onClick={() => {
						router.push("checkOut");
					}}
					className="div3 relative cursor-pointer p-2"
				>
					<p className="absolute bg-yellow-400 right-6 top-2 w-3 text-center rounded-full">
						{items.length}
					</p>

					<ShoppingCartIcon className="pt-2 w-12"></ShoppingCartIcon>
				</div>
			</div>
		</div>
	);
};

export default TopHeader;
