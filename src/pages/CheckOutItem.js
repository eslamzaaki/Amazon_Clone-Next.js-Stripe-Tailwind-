import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
const CheckOutItem = ({ item }) => {
	const dispatch = useDispatch();
	return (
		<div className="grid grid-cols-5 items-center p-5 bg-white">
			<img src={item.image} alt="noimg" className="col-span-1 pt-3" />
			<div className="col-span-3 p-3 space-y-3 pl-5">
				<p className="font-bold">{item.title}</p>
				<div className="flex text-yellow-300">
					<StarIcon width={20}></StarIcon>
					<StarIcon width={20}></StarIcon>
					<StarIcon width={20}></StarIcon>
				</div>
				<p className="text-xs line-clamp-3 pb-5">{item.description}</p>
				<Currency quantity={item.price} currency="GBP"></Currency>
			</div>
			<div className="flex flex-col  text-black-500 font-bold space-y-5">
				<button
					onClick={() => {
						dispatch(addToBasket(item));
					}}
					className="buttonn font-semibold"
				>
					ADD ITEM
				</button>
				<button
					onClick={() => {
						dispatch(removeFromBasket(item));
					}}
					className="buttonn font-semibold"
				>
					REMOVE ITEM{" "}
				</button>
			</div>
		</div>
	);
};

export default CheckOutItem;
