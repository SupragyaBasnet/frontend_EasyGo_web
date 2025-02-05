import React from "react";
import WhiteCar from "../assets/white_car.png"; // Import the local image

const WaitingForDriver = (props) => {
  return (
    <div>
    <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
    props.waitingForDriver(false)}}>
    <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
    <div className="flex items-center justify-between">
    <img className='h-12' src={WhiteCar} alt="White Car" />
      <div className="text-right">
        <h2 className="text-lf font-medium">Supragya Basnet</h2>
        <h4 className="text-xl font-semibold -mt-1 -mb-1">BA 2 JA 2042</h4>
        <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>

      </div>
    </div>

    
    <div className="flex gap-2 justify-between flex-col items-center">

    <div className="w-full mt-5">
      <div className="flex items-center gap-5 p-3 border-b-2">
      <i className=" text-lg ri-map-pin-fill"></i>
      <div>
        <h3 className="text-lg font-medium">562/11-A</h3>
        <p className="text-small -mt-1 text-gray-600">Taudaha,kritipur,Nepal</p>

      </div>
      </div>
      <div className="flex items-center gap-5 p-3 border-b-2">
      <i className="ri-map-pin-user-fill"></i>
      <div>
        <h3 className="text-lg font-medium">562/11-A</h3>
        <p className="text-small -mt-1 text-gray-600">Taudaha,kritipur,Nepal</p>

      </div>
      </div>
      <div className="flex items-center gap-5 p-3 ">
      <i className="ri-currency-line"></i>
      <div>
        <h3 className="text-lg font-medium">Rs. 200.80</h3>
        <p className="text-small -mt-1 text-gray-600">Cash Cash</p>

      </div>
      </div>

    </div>
    
    </div>
    
    
  </div>
  )
}

export default WaitingForDriver