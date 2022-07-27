import React from "react";
import photo from "../photo.png";

export default function Card(props) {
  let { weatherDesc, cityName, country, temp, tempMin, tempMax, icon } = props;
  weatherDesc = weatherDesc == "" ? "" : weatherDesc;
  return (
    <div className="flex flex-col text-white">
      <div className=" mt-20 h-60 bg-slate-600 w-full  ">
        <div className=" ml-40 title flex flex-row  flex-wrap items-center h-full  ">
          <div className=" mt-20 w-3/4 flex flex-col flex-wrap items-center h-full">
            <h1 className="mb-3 text-6xl mr-20">
              {cityName}, {country}
            </h1>
            <div className="w-2/4 h-1 bg-white mr-20 "></div>
          </div>
          <div className="h-70">
            <img className="w-64 " src={icon} alt="" />
            <h1 className="text-3xl font-light flex- flex-col mx-auto border-b-2 ">
              {weatherDesc}
            </h1>
          </div>
        </div>
      </div>
      <div className=" flex flex-col h-70  bg-slate-600 w-120 space-y-7 border-2 rounded-md ml-40 mr-80 text-center p-10 shadow-md shadow-black">
        <h1 className="title text-5xl font-normal  mt-1 text-white ">
          Current Temperature is {temp}°
        </h1>
        <div className="text-4xl font-light flex- flex-col mx-auto text-left	space-y-5">
          <h2>Minimum Temp: {tempMin}°</h2>
          <h2>Maximum Temp: {tempMax}°</h2>
        </div>
      </div>
    </div>
  );
}
