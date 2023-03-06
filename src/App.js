import './App.scss';
import Radio from "./components/Radio";
import Loader from "./components/elements/loader/Loader";
import React, {useEffect, useState} from "react";

function App() {
	const [onStart, setOnStart] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => {
			setOnStart(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={"App"}>
			{onStart ?
				<div className={'intro-box'}><p className={'app-name'}>GaGa Radio Player</p>
					<div className={'loader'}><Loader/></div>
					<p className={'designer'}>designed by Aleksey Umrikhin</p></div> : <Radio/>}
		</div>
	);
}

export default App;
