import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	products: null,
};
/*if (typeof window !== "undefined") {
	initialState = {
		items: localStorage.getItem("itemss")
			? JSON.parse(localStorage.getItem("itemss"))
			: [],
		products: null,
	};
}
*/
export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload];
			//localStorage.setItem("itemss", JSON.stringify(state.items));
		},
		removeFromBasket: (state, action) => {
			let newItems = state.items;
			let index = newItems.findIndex((item) => item.id == action.payload.id);
			newItems.splice(index, 1);
			state.items = newItems;
			//localStorage.setItem("itemss", JSON.stringify(newItems));
		},
		addProducts: (state, action) => {
			state.products = [...action.payload];
		},
	},
});

export const { addToBasket, removeFromBasket, addProducts } =
	basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
	state.basket.items.reduce((total, item) => total + item.price, 0);
export const selectProducts = (state) => state.basket.products;

export default basketSlice.reducer;
