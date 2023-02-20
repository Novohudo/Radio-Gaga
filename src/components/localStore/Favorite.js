import React from 'react';
import error from "../img/radio.svg";


const Favorite = ({setStream,setHideTrash}) => {
	let arr = JSON.parse(localStorage.getItem('result')) || [];
	if(!arr.length){setHideTrash(true)}

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