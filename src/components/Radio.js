import React, {useEffect, useState} from 'react';
import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"
import error from "../img/radio.svg"
import {filters} from "../filters/filters";
import {setupApi} from "../API/API-radio";

export default function Radio() {
	const [stations, setStations] = useState(null);
	const [stationFilter, setStationFilter] = useState("all")
	const [stream, setStream] = useState('')
	const [selected,setSelected] = useState(false)

	useEffect(() => {
		setupApi(stationFilter).then(data => {
			setStations(data)
		})
	}, [stationFilter])

	const setDefaultSrc = event => {
		event.target.src = error
	}

	function active(){
		setSelected(true)
	}

	return (
		<div className="radio">
			<H5AudioPlayer
				header={stream.name}
				className={"player"}
				src={stream.urlResolved}
				showJumpControls={false}
				layout={"stacked"}
				customProgressBarSection={[]}
				customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
				autoPlayAfterSrcChange={true}
			/>
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

									<div className="name">{station.name}</div>
									<div>btr:{station.bitrate}</div>
								</div>
							</div>
						)
					})}

			</div>

		</div>
	)
};
