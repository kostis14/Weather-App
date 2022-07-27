import React, { useEffect } from "react";
import Card from "./Card";

export default function Information() {
  let [information, setInformation] = React.useState([
    {
      tempCityName: "",
      cityName: "",
      cityTemp: "",
      tempMin: "",
      tempMax: "",
      country: "",
      weatherDesc: "",
      icon: "",
    },
  ]);

  function showPosition(pos) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setInformation({
          tempCityName: "",
          cityName: data.name,
          cityTemp: data.main.temp,
          tempMin: data.main.temp_min,
          tempMax: data.main.temp_max,
          country: data.sys.country,
          weatherDesc: data.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
      });
  }
  let {
    weatherDesc,
    icon,
    tempCityName,
    cityName,
    cityTemp,
    tempMin,
    tempMax,
    country,
  } = information;
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("please allow geolocation");
    }
  }, []);

  function changeCity() {
    let City = tempCityName.split(",")[0];
    let CountryCode =
      tempCityName.split(",").length > 1
        ? tempCityName.split(",")[1].replace(/\s+/g, "")
        : "";
    console.log(City, CountryCode);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${City}${
        CountryCode != "" ? "," + CountryCode : ""
      }&appid=&mode=json&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.weather[0].icon);

        setInformation({
          cityName: City,
          tempCityName: "",
          cityTemp: data.main.temp,
          tempMin: data.main.temp_min,
          tempMax: data.main.temp_max,
          country: data.sys.country,
          weatherDesc: data.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
      });
  }

  return (
    <div>
      <Card
        cityName={cityName}
        temp={Math.round(cityTemp)}
        tempMin={Math.round(tempMin)}
        tempMax={Math.round(tempMax)}
        country={country}
        icon={icon}
        weatherDesc={weatherDesc}
      />
      <div className="w-full-max-w-xs mt-10 w-96 justify-center ml-96">
        <div className="bg-slate-300 -shadow-md rounded-xl px-8 pt-6 pb-4 mb-4 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Search another City!
            </label>
            <input
              className="shadow text-center appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              type="text"
              placeholder="City, Country Code"
              onChange={(e) => {
                setInformation({
                  ...information,
                  tempCityName: e.target.value,
                });
              }}
            />
            <button
              onClick={changeCity}
              className="bg-blue-500 mt-6 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
