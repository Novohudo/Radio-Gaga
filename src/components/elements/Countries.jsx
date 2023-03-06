import React from 'react';
import {countries} from "../filters/filters";

const Countries = ({selectedCountry, setSelectedCountry, setShowStationsList}) => {

	function handleClick(country) {
		setSelectedCountry(country);
		setShowStationsList(true);
	}

	return (
		<div className={'countries'}>
			{countries.map((country, index) => (
				<span
					className={selectedCountry === country ? 'selected' : ''}
					key={index}
					onClick={() => handleClick(country)}>
						{country}
					</span>
			))}
		</div>
	);
};

export default Countries;