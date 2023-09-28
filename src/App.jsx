import { useEffect, useState } from "react";

import "./App.css";
import Options from "../components/Options";
import WeatherCard from "../components/WeatherCard";

function App() {
    const [query, setQuery] = useState("");
    const [locations, setLocations] = useState([]);
    const [cords, setCords] = useState({ lat: 0, lon: 0 });

    useEffect(() => {
        if (query.length >= 3) {
            fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${
                    import.meta.env.VITE_API_KEY
                }`
            )
                .then((res) => res.json())
                .then((data) => setLocations(data))
                .catch((error) => {
                    console.log(error.message);
                });
        } else {
            setLocations([]);
        }
        // console.log(locations)
    }, [query]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            // Geolocation is available
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setCords({lat, lon});
                    // console.log(lat, lon)
                },
                function (err) {
                    console.log(err.message);
                }
            );
        } else {
            console.log("Geolocation is not available in this browser.");
        }
    }, []);

    return (
        <div className="container">
            <img src="main_bg.jpg" className="bgImage" />
            <form className="queryForm">
                <ion-icon name="search-outline"></ion-icon>
                <input
                    type="text"
                    placeholder="Search location"
                    className="queryInput"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Options
                    locations={locations}
                    query={query}
                    setQuery={setQuery}
                    setLocations={setLocations}
                    setCords={setCords}
                />
            </form>
            <div className="output">
                <WeatherCard cords={cords} />
            </div>
        </div>
    );
}

export default App;
