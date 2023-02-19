import React, {useEffect, useState} from 'react';
import error from "../components/img/radio.svg";

const Favorite = ({setStream}) => {
const [favorite,setFavorite] = useState([]);

useEffect(()=>{
	const favorite = JSON.parse(localStorage.getItem('favorite'));
	if (favorite){
		setFavorite(favorite)
	}
},[])

	const setDefaultSrc = event => {
		event.target.src = error
	}
	return (
		<div className="favorite">
			{favorite.map((station, index) => {
					return (
						<div key={index} onClick={() => setStream(station)}>
							<div className="favorite-Block">
								<div className={"delete-button"}>X</div>
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