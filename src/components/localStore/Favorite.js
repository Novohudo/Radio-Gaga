import React from 'react';
import error from "../img/radio.svg";
import favorite from "../../localStore/Favorite";

const Favorite = ({setStream}) => {
	let arr = JSON.parse(localStorage.getItem('result')) || [];
	const setDefaultSrc = event => {
		event.target.src = error
	}

	return (
		<div className="favorite">
			{arr &&
				arr.map((station) => {
					return (
						<div onClick={() => setStream(station)}>
							<div className="favorite-Block">
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