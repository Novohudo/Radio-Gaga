import React, {useState} from 'react';
import error from "../img/radio.svg";

const Stations = ({stations,setStream}) => {
	let arr = JSON.parse(localStorage.getItem('result')) || [];

	function saveToFavorite(station) {
		arr.push(station)
		localStorage.setItem('result',JSON.stringify(arr))
			}

	const setDefaultSrc = event => {
		event.target.src = error
	}
	return (
		<div className="stations">
			{stations &&
				stations.map((station, index) => {
					return (
						<div className="station" key={index} onClick={() => setStream(station)}>
							<div className="stationName">

								<img
									className="logo"
									src={station.favicon}
									alt="station logo"
									onError={setDefaultSrc}
								/>
								<div className="name">{station.name} btr:{station.bitrate}</div>
								<button onClick={()=>saveToFavorite(station)}>save</button>
							</div>
						</div>
					)
				})}
		</div>
	);
};

export default Stations;