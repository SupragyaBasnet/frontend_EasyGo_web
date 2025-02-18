// import React from "react";
// import WhiteCar from "../assets/white_car.png"; // Import the local image

// const WaitingForDriver = (props) => {
//   return (
//     <div>
//       <h5
//         className="p-1 text-center w-[93%] absolute top-0"
//         onClick={() => {
//           props.waitingForDriver(false);
//         }}
//       >
//         <i className=" text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
//       </h5>
//       <div className="flex items-center justify-between">
//         <img className="h-12" src={WhiteCar} alt="White Car" />
//         <div className="text-right">
//           <h2 className="text-lg font-medium capitalize">
//             {props.ride?.captain.fullname.firstname}
//           </h2>
//           <h4 className="text-xl font-semibold -mt-1 -mb-1">
//             {props.ride?.captain.vehicle.plate}
//           </h4>
//           <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
//           <h1 className="text-lg font-semibold"> {props.ride?.otp} </h1>
//         </div>
//       </div>

//       <div className="flex gap-2 justify-between flex-col items-center">
//         <div className="w-full mt-5">
//           <div className="flex items-center gap-5 p-3 border-b-2">
//             <i className=" text-lg ri-map-pin-fill"></i>
//             <div>
//               <h3 className="text-lg font-medium">562/11-A</h3>
//               <p className="text-sm -mt-1 text-gray-600">
//                 {props.ride?.pickup}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-5 p-3 border-b-2">
//             <i className="ri-map-pin-user-fill"></i>
//             <div>
//               <h3 className="text-lg font-medium">562/11-A</h3>
//               <p className="text-sm -mt-1 text-gray-600">
//                 {props.ride?.destination}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-5 p-3 ">
//             <i className="ri-currency-line"></i>
//             <div>
//               <h3 className="text-lg font-medium">Rs.{props.ride?.fare} </h3>
//               <p className="text-small -mt-1 text-gray-600">Cash Cash</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WaitingForDriver;




import React from "react";
import Auto from "../assets/auto.webp";
import Moto from "../assets/moto.jpeg";
import WhiteCar from "../assets/white_car.png";

const WaitingForDriver = (props) => {
  console.log("waiting for driver \n ", props);

  // Function to get the correct vehicle image
  const getVehicleImage = () => {
    const vehicleType = props.ride.captain.vehicle.vehicleType;

    switch (vehicleType) {
      case "auto":
        return Auto;
      case "moto":
        return Moto;
      case "car":
        return WhiteCar;
      default:
        return WhiteCar; // Default to car if vehicleType is missing
    }
  };

  return (
    <div>
      {/* Close Button */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => props.setWaitingForDriver(false)}
        
      >
        <i className=" text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Driver & Vehicle Info */}
      <div className="flex items-center justify-between">
        <img className="h-12" src={getVehicleImage()} alt="Vehicle" />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">
            {props.ride.captain.fullname.firstname}{" "}
            {props.ride.captain.fullname.lastname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {props.ride.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">
            {props.ride.captain.vehicle.name} {/* Dynamic Vehicle Name */}
          </p>
          <h1 className="text-lg font-semibold"> {props.otp} </h1>
        </div>
      </div>

      {/* Ride Details */}
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          {/* Pickup Location */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride.pickup}
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride.destination}
              </p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-5 p-3 ">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">Rs.{props.ride.fare} </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
