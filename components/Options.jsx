import React from "react";

import "./options.css";

const Options = ({ locations, setCords, setLocations, setQuery, query }) => {
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
                          {location.name},{" "}
                          {location.state}, {" "}
                          {location.country}
                      </li>
                  ))
                : (
                    query.length>2 && (
                        <li className="locationItem">No such city found</li>
                    )
                )}
        </ul>
    );
};

export default Options;
