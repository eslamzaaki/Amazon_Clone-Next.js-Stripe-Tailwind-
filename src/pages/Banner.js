import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Banner() {
	return (
		<div className="relative ">
			<div className="absolute -bottom-80 opacity-40 h-96 z-40 w-full bg-gradient-to-b from-yellow-100 to-transparent"></div>

			<Carousel
				autoPlay={true}
				infiniteLoop={true}
				showIndicators={false}
				showThumbs={false}
				interval={2000}
				showStatus={false}
			>
				<div>
					<img
						loading="lazy"
						src="https://m.media-amazon.com/images/I/711Y9Al9RNL._SX3000_.jpg"
					/>
				</div>
				<div>
					<img
						loading="lazy"
						src="https://m.media-amazon.com/images/I/51BNzDmnUqL._SX1500_.jpg"
					/>
				</div>
				<div>
					<img
						loading="lazy"
						src="https://m.media-amazon.com/images/I/61lJ3xlQX2L._SX3740_.jpg"
					/>
				</div>
			</Carousel>
		</div>
	);
}

export default Banner;
