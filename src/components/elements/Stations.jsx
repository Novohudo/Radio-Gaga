import React from 'react';
import error from "../../img/radio.svg";
import like from "../../img/like.svg";

const Stations = ({stations, setStream, setRerender, isActive, setIsActive, setShowNotification}) => {
	const arr = JSON.parse(localStorage.getItem('result')) || [];

	function saveToFavorite(station) {
		arr.push(station)
		localStorage.setItem('result', JSON.stringify(arr));
		setRerender(true);
		showMessage();
	}

	function activeStationItem(station) {
		setStream(station);
		setIsActive(station);
		const previousActiveEl = document.querySelector('.favoriteBlock.active');
		if (previousActiveEl) {
			previousActiveEl.classList.remove('active');
		}
	}

	const showMessage = () => {
		setShowNotification(true);
		setTimeout(() => setShowNotification(false), 2000)
	};

	return (
		<div className={'stations'}>
			{stations && stations.map((station) => {
				return (
					<div className={'station'}>
						<div className={`stationBlock ${isActive === station ? 'playedStation' : ''}`}>
							<img
								onClick={() => activeStationItem(station)}
								src={station.favicon || error}
								alt={"!"}
							/>
							<button className={'save-button'} onClick={() => saveToFavorite(station)}><img src={like} alt={"oops"}/>
							</button>
							<div className={'stationName'}>{station.name}</div>
						</div>
					</div>
				)
			})}
		</div>
	);
};
export default Stations;