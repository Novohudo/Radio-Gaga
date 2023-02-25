import React from 'react';
import error from "../img/radio.svg";
import like from "../img/like.svg";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Stations = ({stations, setStream}) => {
const arr = JSON.parse(localStorage.getItem('result')) || [];

	function saveToFavorite(station) {
		arr.push(station)
		localStorage.setItem('result', JSON.stringify(arr));
		showToastMessage();
	}
	const showToastMessage = () => {
		toast.success('saved to favorite', {
			position: toast.POSITION.BOTTOM_CENTER,
			className: 'toast-message',
			autoClose:500,
			hideProgressBar: true,
		});
	};

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
								<button className={'save-button'} onClick={() => saveToFavorite(station)}><img src={like}/></button>
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