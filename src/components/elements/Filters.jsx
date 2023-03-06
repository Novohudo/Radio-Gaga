import React from 'react';
import {filters} from "../filters/filters";

const Filters = ({stationFilter, setStationFilter}) => {

	return (
		<div className={'filters'}>
			{filters.map((filter, index) => (
				<span
					key={index}
					className={stationFilter === filter ? 'selected' : ''}
					onClick={() => setStationFilter(filter)}
				>
          {filter}
        </span>
			))}
		</div>
	);
};

export default Filters;