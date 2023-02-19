import React, {useEffect, useState} from 'react';
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"
import error from "./img/radio.svg"
import {SetupApi} from "../API/API-radio";
import Countries from "./elements/Countries";
import Filters from "./elements/Filters";
import Stations from "./elements/Stations";
import Favorite from "../localStore/Favorite";

export default function Radio() {
	const [stations, setStations] = useState(null);
	const [stationFilter, setStationFilter] = useState("all")
	const [stream, setStream] = useState([])
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [animationLogo, setAnimationLogo] = useState(false)
	
	useEffect(() => {
		SetupApi(stationFilter, selectedCountry).then(data => {
			setStations(data)
		})
	}, [stationFilter, selectedCountry])

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
			<details className={"custom-details"}>
				<summary>Favorites</summary>
				<Favorite
					setStream={setStream}
				/>
			</details>
			<hr/>
			<details>
				<summary>Choose country</summary>
				<Countries
					selectedCountry={selectedCountry}
					setSelectedCountry={setSelectedCountry}/>
			</details>
			<hr/>
			<details>
				<summary>Pick a genre</summary>
				<Filters
					stationFilter={stationFilter}
					setStationFilter={setStationFilter}/>
			</details>
			<hr/>
			<Stations
				stations={stations}
				setStream={setStream}
				stream={stream}
				/>
		</div>
	)
};
