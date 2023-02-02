import React from 'react';
import {countries} from "../filters/filters";


const Countries = ({selectedCountry,setSelectedCountry}) => {
	return (
		<div className={"countries"}>
			{countries.map((country, index) => (
				<span
					className={selectedCountry === country ? "selected" : ""}
					key={index}
					onClick={() => setSelectedCountry(country)}>
						{country}
					</span>
			))}
		</div>
	);
};

export default Countries;