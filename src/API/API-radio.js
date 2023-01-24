import {RadioBrowserApi} from "radio-browser-api";

export const setupApi = async stationFilter => {
	const api = new RadioBrowserApi("My Radio App")
	api.setBaseUrl('https://de1.api.radio-browser.info/')
	const stations = await api.searchStations({
		"country":"America",
		tag: stationFilter,
		limit: 30,
	})
	.then(data => {
		return data
	})
	return stations
}