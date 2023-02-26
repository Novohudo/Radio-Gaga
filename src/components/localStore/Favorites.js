import React, {useState} from 'react';
import error from "../img/radio.svg";
import clear from "../img/clear.svg";

const Favorites = ({setStream, setRerender}) => {
	const [active, setActive] = useState(null)

	let arr = JSON.parse(localStorage.getItem('result')) || [];

	const handleDelete = (id) => {
		const newArr = arr.filter((station) => station.id !== id);
		localStorage.setItem('result', JSON.stringify(newArr));
		setRerender(true)
	}

	function activeFavoriteItem(station) {
		setStream(station);
		setActive(station);
		const activeEl = document.querySelector('.favoriteBlock.active');
		if (activeEl) {
			activeEl.classList.toggle('active');
		}
		const el = document.querySelector(`.favoriteBlock[data-id="${station.id}"]`);
		el.classList.toggle('active');
	}

	return (
		<div className="favorites">
			{arr &&
				arr.map((station) => {
					return (
						<div className="favorite">
							<div className={`favoriteBlock ${active === station ? "active" : ""}`} data-id={station.id}>
								<img
									onClick={() => activeFavoriteItem(station)}
									src={station.favicon || error}
									alt="station logo"
								/>
								<button onClick={() => handleDelete(station.id)} className={"deleteButton"}><img src={clear}/></button>
								<div className="favoriteName">{station.name}</div>
							</div>
						</div>
					)
				})}
		</div>
	);
};

export default Favorites;