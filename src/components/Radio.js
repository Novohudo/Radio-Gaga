import React, {useEffect, useState} from 'react';
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"
import error from "../img/radio.svg"
import {countries, filters} from "../filters/filters";
import {SetupApi} from "../API/API-radio";


export default function Radio({animatedLogo}) {
	const [stations, setStations] = useState(null);
	const [stationFilter, setStationFilter] = useState("all")
	const [stream, setStream] = useState('')
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [animationLogo, setAnimationLogo] = useState(false)


	useEffect(() => {
		SetupApi(stationFilter, selectedCountry).then(data => {
			setStations(data)
		})
	}, [stationFilter, selectedCountry])

	const setDefaultSrc = event => {
		event.target.src = error
	}

	return (
		<div className={"radio"}>

			<div className={"player-body"}>
				<img className={animationLogo === true ? "animated-logo" : "static-logo"} src={stream.favicon || error}/>
				<H5AudioPlayer
					onPlay={() => setAnimationLogo(true)}
					onPause={() => setAnimationLogo(false)}
					header={stream.name}
					className={"player"}
					src={stream.urlResolved}
					layout={"stacked-reverse"}
					showDownloadProgress={true}
					showJumpControls={false}
					customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
					autoPlayAfterSrcChange={true}
				/>
			</div>
			<h3>Choose country</h3>

			<div className={"countries"}>
				{countries.map((country, index) => (
					<span
						className={selectedCountry === country ? "selected" : ""}
						key={index}
						onClick={() => setSelectedCountry(country)}>
						{country}
					</span>
				))}
			</div>

			<hr/>
			<h3>Pick a genre</h3>

			<div className="filters">
				{filters.map((filter, index) => (
					<span
						key={index}
						className={stationFilter === filter ? "selected" : ""}
						onClick={() => setStationFilter(filter)}
					>
          {filter}
        </span>
				))}
			</div>

			<hr/>
			<div className="stations">
				{stations &&
					stations.map((station, index) => {
						return (
							<div className="station" key={index} onClick={() => setStream(station)}>

								<div className="stationName">

									<img
										className="logo"
										src={station.favicon}
										alt="station logo"
										onError={setDefaultSrc}

									/>
									<div className="name">{station.name} btr:{station.bitrate}</div>
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
};
