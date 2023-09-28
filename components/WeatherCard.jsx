import React, { useEffect, useState } from "react";

import "./weathercard.css";

const WeatherCard = ({ cords }) => {
    const [data, setData] = useState(null);
    const [unit, setUnit] = useState("C");

    useEffect(() => {
        if (cords.lat != 0 && cords.lon != 0) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${
                    cords.lat
                }&lon=${cords.lon}&units=metric&appid=${
                    import.meta.env.VITE_API_KEY
                }`
            )
                .then((res) => res.json())
                .then((data) => setData(data))
                .catch((error) => {
                    console.log(error.message);
                });
        }
        console.log(data);
    }, [cords]);

    const convert = (celsius) => {
        var fahrenheit = (celsius * 9) / 5 + 32;
        return fahrenheit.toFixed(1);
    };
    const handleClick = () => {
        setUnit((prev) => (prev === "C" ? "F" : "C"));
    };
    const getTime = () => {
        const now = new Date();
        return now.toLocaleString(undefined, {
            timeStyle: "short",
            dateStyle: "medium",
        });
    };
    return (
        <div className="cardContainer">
            <div className="cardInfo">
            <button className="unitToggle" onClick={handleClick}>
                &deg;C
            </button>
                {data ? (
                    <>
                        <div className="time">{getTime()}</div>
                        <div className="name">{data.name}</div>
                        <div className="temp">
                            <span>
                                {unit === "C"
                                    ? data.main.temp.toFixed(1)
                                    : convert(data.main.temp)}
                                &deg;{unit}
                            </span>
                            <span className="feels">
                                feels like {unit === "C"
                                    ? data.main.feels_like.toFixed(1)
                                    : convert(data.main.feels_like)}
                                &deg;{unit}
                            </span>
                        </div>
                        <div className="weather">
                            <img
                                className="icon"
                                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                onError={(e) => (e.target.src = "unknown.png")}
                                alt="unknown.png"
                            />
                            {data.weather[0].main}
                        </div>
                        <div className="bottomContainer">
                            <div className="wind">
                                <span className="label">Wind Speed</span>
                                <span>{data.wind.speed} km/h</span>
                            </div>
                            <div className="humidity">
                                <span className="label">Humidity</span>
                                <span>{data.main.humidity} %</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Please select a location</div>
                )}
            </div>
        </div>
    );
};

export default WeatherCard;
