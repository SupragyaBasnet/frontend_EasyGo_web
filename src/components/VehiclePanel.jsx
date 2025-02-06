import React from "react";
import "remixicon/fonts/remixicon.css";
import Auto from "../assets/auto.webp";
import Moto from "../assets/moto.jpeg";
import WhiteCar from "../assets/white_car.png";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className=" text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex border-2 active:border-black  mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img className="h-12" src={WhiteCar} alt="White Car" />
        <div className="ml-2 w-[80%]">
          <h4 className="font-medium text-lg">
            EasyGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs 150.50</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex border-2 active:border-black  mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img className="h-12" src={Moto} alt="Moto Car" />
        <div className="ml-2 w-[80%]">
          <h4 className="font-medium text-lg">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs 90.33</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex border-2 active:border-black  mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img className="h-12" src={Auto} alt="Autorikshaw" />
        <div className=" ml-2 w-[80%]">
          <h4 className="font-medium text-lg">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">4 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs 70.50</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
