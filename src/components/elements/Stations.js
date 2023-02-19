import React from 'react';
import error from "../img/radio.svg";

const Stations = ({stations, setStream,setRerender,setHideTrash}) => {
const arr = JSON.parse(localStorage.getItem('result')) || [];

	function saveToFavorite(station) {
		arr.push(station)
		localStorage.setItem('result', JSON.stringify(arr));
		setRerender(true)
		setHideTrash(false)
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
							<div className="stationBlock">
								<img
									src={station.favicon}
									alt="station logo"
									onError={setDefaultSrc}
								/>
								<div className="stationName">{station.name}</div>
								<button className={'save-button'} onClick={() => saveToFavorite(station)}>save</button>
							</div>
						</div>
					)
				})}
		</div>
	);
};

export default Stations;