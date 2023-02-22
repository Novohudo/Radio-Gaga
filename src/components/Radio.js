import React, {useEffect, useState} from 'react';
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"
import error from "./img/radio.svg"
import clear from "./img/clear.svg";
import {SetupApi} from "../API/API-radio";
import Countries from "./elements/Countries";
import Filters from "./elements/Filters";
import Stations from "./elements/Stations";
import Favorite from "./localStore/Favorite";
import {toast} from "react-toastify";


export default function Radio() {
	const [stations, setStations] = useState(null);
	const [stationFilter, setStationFilter] = useState("all")
	const [stream, setStream] = useState([])
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [animationLogo, setAnimationLogo] = useState(false)
	const [hideTrash, setHideTrash] = useState(false);
	const [rerender, setRerender] = useState(false)

	useEffect(() => {
		SetupApi(stationFilter, selectedCountry).then(data => {
			setStations(data)
		})
		setRerender(false)
	}, [stationFilter, selectedCountry, rerender])

	function deleteFavorite() {
		localStorage.clear();
		setRerender(true);
	}
	const showToastMessage = () => {
		toast.success('saved to favorite', {
			position: toast.POSITION.BOTTOM_CENTER,
			className: 'toast-message',
			autoClose:500,
			hideProgressBar: true,
		});
	};

	return (
		<div className={"radio"}>
			<div className={"player-body"}>
				<img className={animationLogo === true ? "animated-logo" : "static-logo"} src={stream.favicon || error}/>
				<H5AudioPlayer
					header={stream.name}
					className={"player"}
					src={stream.urlResolved}
					layout={"stacked-reverse"}
					onPlay={() => setAnimationLogo(true)}
					onPause={() => setAnimationLogo(false)}
					showDownloadProgress={true}
					showJumpControls={false}
					customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
					autoPlayAfterSrcChange={true}
				/>
			</div>
			<details open className={"custom-details"}>
				<summary>Favorites</summary>
				<button className={hideTrash === true ? 'hide-delete-button' : 'delete-button'} onClick={deleteFavorite}><img
					className={'clearImg'} src={clear}/></button>
				<Favorite
					setHideTrash={setHideTrash}
					setStream={setStream}
				/>
			</details>
			<hr/>
			<details open>
				<summary>Choose country</summary>
				<Countries
					selectedCountry={selectedCountry}
					setSelectedCountry={setSelectedCountry}/>
			</details>
			<hr/>
			<details open>
				<summary>Pick a genre</summary>
				<Filters
					stationFilter={stationFilter}
					setStationFilter={setStationFilter}/>
			</details>
			<hr/>
			<Stations
				showToastMessage={showToastMessage}
				setRerender={setRerender}
				setHideTrash={setHideTrash}
				stations={stations}
				setStream={setStream}
				stream={stream}
			/>
		</div>
	)
};
