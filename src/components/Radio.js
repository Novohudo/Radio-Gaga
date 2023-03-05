import React, {useEffect, useState} from 'react';
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"
import error from "../img/radio.svg";
import {SetupApi} from "../API/API-radio";
import Countries from "./elements/Countries";
import Filters from "./elements/Filters";
import Stations from "./elements/Stations";
import Favorites from "./localStore/Favorites";
import Loader from "./elements/loader/Loader";


export default function Radio() {
	const [stations, setStations] = useState(null);
	const [stationFilter, setStationFilter] = useState("all")
	const [stream, setStream] = useState([])
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [animationLogo, setAnimationLogo] = useState(false)
	const [rerender, setRerender] = useState(false)
	const [isActive, setIsActive] = useState(null)
	const [showNotification, setShowNotification] = useState(false);
	const [showStationsList, setShowStationsList] = useState(false);
	const [isLoading,setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		SetupApi(stationFilter, selectedCountry).then(data => {
			setStations(data)
			setTimeout(()=>{
				setIsLoading(false)
			},500)

		})
	}, [stationFilter, selectedCountry])

	useEffect(() => {
		setRerender(false)
	}, [rerender])

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
			{showNotification && (
				<div className={'notificationBox'}>
					<p className="notification">added to favorite</p>
				</div>
			)}
			<details open>
				<summary>Favorites</summary>
				<Favorites
					setShowNotification={setShowNotification}
					isActive={isActive}
					setIsActive={setIsActive}
					setRerender={setRerender}
					setStream={setStream}
				/>
			</details>
			<div className={'customHr'}/>
			<details open>
				<summary>Choose country</summary>
				<Countries
					setShowStationsList={setShowStationsList}
					selectedCountry={selectedCountry}
					setSelectedCountry={setSelectedCountry}/>
			</details>
			<div className={'customHr'}/>
			<details open>
				<summary>Pick a genre</summary>
				<Filters
					stationFilter={stationFilter}
					setStationFilter={setStationFilter}/>
			</details>
			<div className={'customHr'}/>
			{showStationsList && (
				<p>Choose a station</p>
			)}
			{isLoading ? (<div className={'pre-loader'}><Loader/></div>) :
				<Stations
					setShowNotification={setShowNotification}
					isActive={isActive}
					setIsActive={setIsActive}
					setRerender={setRerender}
					stations={stations}
					setStream={setStream}
					stream={stream}
				/>
			}
		</div>
	)
};
