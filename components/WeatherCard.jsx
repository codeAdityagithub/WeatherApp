import React, { useEffect, useState } from "react";

import "./weathercard.css";

const WeatherCard = ({ cords }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        if (cords.lat != 0 && cords.lon != 0) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${cords.lat}&lon=${cords.lon}&appid=${
                    import.meta.env.VITE_API_KEY
                }`
            )
                .then((res) => res.json())
                .then((data) => setData(data))
                .catch((error) => {
                    console.log(error.message);
                });
        }
        console.log(data)
    }, [cords]);
    // console.log(new Date(1695877933).toLocaleString())
    return (
        <div className="cardContainer">
                <div className="name">{data && data.name}</div>
                <div className="cardInfo">
                {data ? (
                    <>
                    <div className="time">time</div>
                    <div className="temp">{data.main.temp}</div>
                    <div className="weather">{data.weather[0].main}</div>
                    <div className="wind">{data.wind.speed}</div>
                    <div className="humidity">{data.main.humidity}</div>
                    </>
                    ):(
                        <div>Please select a location</div>
                    )
                    }
                </div>
        </div>
    );
};

export default WeatherCard;
