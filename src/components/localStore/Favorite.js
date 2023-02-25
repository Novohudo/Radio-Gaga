import React from 'react';
import error from "../img/radio.svg";
import clear from "../img/clear.svg";

const Favorite = ({setStream}) => {
	let arr = JSON.parse(localStorage.getItem('result')) || [];

	const handleDelete = (id) => {
		const newArr = arr.filter((station) => station.id !== id);
		localStorage.setItem('result', JSON.stringify(newArr));
	}


	const setDefaultSrc = event => {
		event.target.src = error
	}

	return (
		<div className="favorite">
			{arr &&
				arr.map((station) => {
					return (
						<div onClick={() => setStream(station)}>
							<br/>
							<div className="favorite-Block">
								<img
									src={station.favicon}
									alt="station logo"
									onError={setDefaultSrc}
								/>
								<button onClick={() => handleDelete(station.id)} className={"delete-button"}><img src={clear}/></button>
								<div className="favorite-name">{station.name}</div>
								<p>'idiot - for commit'</p>
							</div>
							<br/>
						</div>

					)
				})}
		</div>
	);
};

export default Favorite;