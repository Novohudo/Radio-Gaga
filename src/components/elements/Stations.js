import React from 'react';
import error from "../img/radio.svg";

const Stations = ({stations,setStream}) => {
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
							</div>
						</div>
					)
				})}
		</div>
	);
};

export default Stations;