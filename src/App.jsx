import { useEffect, useState } from "react";

import "./App.css";
import Options from "../components/Options";
import WeatherCard from "../components/WeatherCard";

function App() {
    const [query, setQuery] = useState("");
    const [locations, setLocations] = useState([]);
    const [cords, setCords] = useState({lat:0, lon:0})

    useEffect(() => {
        if (query.length >= 3) {
            fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${
                    import.meta.env.VITE_API_KEY
                }`
            )
                .then((res) => res.json())
                .then((data) => setLocations(data))
                .catch((error) => {console.log(error.message)});
        }else{
          setLocations([])
        }
        // console.log(locations)
    }, [query]);

    return (
        <div className="container">
            <form className="queryForm">
                <input
                    type="text"
                    className="queryInput"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Options locations={locations} setQuery={setQuery} setLocations={setLocations} setCords={setCords} />
            </form>
            <div className="output">
              <WeatherCard cords={cords} />
            </div>
        </div>
    );
}

export default App;
