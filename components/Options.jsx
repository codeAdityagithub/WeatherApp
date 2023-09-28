import React from "react";

import "./options.css";

const Options = ({ locations, setCords, setLocations, setQuery }) => {
    // console.log(locations)
    const handleClick = (lat, lon) => {
        setCords({ lat, lon });
        // console.log({lat, lon})
        setLocations([]);
        setQuery("");
    };

    return (
        <ul className="locationsList">
            {locations.length != 0
                ? locations.map((location, ind) => (
                      <li
                          key={ind}
                          className="locationItem"
                          onClick={() =>
                              handleClick(
                                  location.lat,
                                  location.lon,
                              )
                          }
                      >
                          {location.name}
                      </li>
                  ))
                : null}
        </ul>
    );
};

export default Options;
