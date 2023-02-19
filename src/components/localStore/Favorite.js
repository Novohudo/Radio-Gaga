import React from 'react';
import error from "../img/radio.svg";

const Favorite = ({setStream}) => {
	let arr = JSON.parse(localStorage.getItem('result')) || [];
	const setDefaultSrc = event => {
		event.target.src = error
	}
	return (
		<div className="favorite">
			{arr &&
				arr.map((station, index) => {
					return (
						<div key={index} onClick={() => setStream(station)}>
							<div className="favorite-Block">
								<div className={"delete-button"}>X</div>
								<img
									className="logo"
									src={station.favicon}
									alt="station logo"
									onError={setDefaultSrc}
								/>
								<div className="favorite-name">{station.name}</div>

							</div>
						</div>
					)
				})}
		</div>
	);
};

export default Favorite;