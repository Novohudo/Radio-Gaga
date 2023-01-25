import {RadioBrowserApi} from "radio-browser-api";

export const SetupApi = async( stationFilter,selectedCountry) => {
	const api = new RadioBrowserApi("My Radio App")
	api.setBaseUrl('https://de1.api.radio-browser.info/')
	const stations = await api.searchStations({
		"country":selectedCountry,
		tag: stationFilter,
		limit: 30,
	})
	.then(data => {
		return data
	})
	return stations

}