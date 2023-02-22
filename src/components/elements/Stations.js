import React from 'react';
import error from "../img/radio.svg";
import like from "../img/like.svg";
import {cssTransition, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Stations = ({stations, setStream,setRerender,setHideTrash,showToastMessage}) => {
const arr = JSON.parse(localStorage.getItem('result')) || [];

	function saveToFavorite(station) {
		arr.push(station)
		localStorage.setItem('result', JSON.stringify(arr));
		setRerender(true);
		setHideTrash(false);
		showToastMessage();
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
								<img src={like} className={'save-button'} onClick={() => saveToFavorite(station)}/>
								<img
									src={station.favicon}
									alt="station logo"
									onError={setDefaultSrc}
								/>
								<div className="stationName">{station.name}</div>
								<ToastContainer/>
							</div>
						</div>
					)
				})}
		</div>
	);
};
export default Stations;