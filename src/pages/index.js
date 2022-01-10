import Headerr from "./Headerr";
import Banner from "./Banner";
import ProductFeed from "./ProductFeed";
import { addProducts, selectProducts } from "../slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Home({ products }) {
	const dispatch = useDispatch();
	const productss = useSelector(selectProducts);
	if (productss == null) {
		dispatch(addProducts(products));
	}
	return (
		<div className="">
			{/*Header */}
			<Headerr></Headerr>
			<main className="max-w-screen-xl relative mx-auto">
				{/*Banner */}
				<Banner></Banner>
				{/*Product Feed */}
				<ProductFeed products={productss}></ProductFeed>
			</main>
		</div>
	);
}
export async function getServerSideProps(context) {
	const products = await fetch("https://fakestoreapi.com/products").then(
		(res) => res.json()
	);

	return {
		props: { products }, // will be passed to the page component as props
	};
}
