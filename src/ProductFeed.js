import Product from "./Product";
import React from "react";

function ProductFeed({ products }) {
	console.log(products);
	return (
		<div className="w-full p-5 grid  grid-flow-row-dense bg-gray-100 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
			{products
				? products.map((product, index) => {
						console.log(product.id);
						return (
							<Product
								product={product}
								key={product.id + "+" + product.title}
							></Product>
						);
				  })
				: ""}
		</div>
	);
}

export default ProductFeed;
