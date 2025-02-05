import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import Auto from "../assets/auto.webp";
import EasyGoLogo from "../assets/EasyGo.png";
import Moto from "../assets/moto.jpeg";
import WhiteCar from "../assets/white_car.png";
import LocationSearchPanel from '../components/LocationSearchPanel';
const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef =useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)


  const submitHandler = (e) => {
    e.preventDefault();
  };


  useGSAP(function(){
    if(panelOpen){
    gsap.to(panelRef.current,{
      height:'70%',
      padding:24
      // opacity:1
    })
    gsap.to(panelCloseRef.current,{
      opacity:1
    })
  }else{
    gsap.to(panelRef.current,{
      height:'0%',
      // opacity:0
      padding:0
    })
    gsap.to(panelCloseRef.current,{
      opacity:0
    })
  }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(0)'
  
      })
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(100%)'
  
      })
    }

  },[vehiclePanel])



  return (
    <div className='h-screen relative overflow-hidden'>
        <img
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md absolute left-5 top-5"
          src={EasyGoLogo}
          alt="EasyGo Logo"
        />
      <div className='h-screen w-screen'>
        {/* image for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt=""/>
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }}  className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[41%] left-10 bg-gray-900 rounded-full"></div>
            <input
            onClick={()=>{
              setPanelOpen(true)
            }}
            value={pickup}
            onChange={(e)=>{
              setPickup(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
            type = "text"
            placeholder='Add a pick-up location'/>
            <input
            onClick={()=>{
              setPanelOpen(true)
            }}
            value={destination}
            onChange={(e)=>{
              setDestination(e.target.value)
            }}
            className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
            type = "text"
            placeholder='Enter your destination'/>
            </form>
            </div>
            <div ref={panelRef} className= ' bg-white h-0'>
              <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>

            </div>

      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14'>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        setVehiclePanel(false)}}>
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
      <div className='flex border-2 active:border-black  mb-2 rounded-xl w-full p-3 items-center justify-between'>
  <img className='h-12' src={WhiteCar} alt="White Car" />
  <div className='ml-2 w-[80%]'>
  <h4 className='font-medium text-lg'>EasyGo <span><i className="ri-user-3-fill"></i>4</span></h4>
  <h5 className='font-medium text-sm'>2 mins away</h5>
  <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
  </div>
  <h2 className='text-lg font-semibold'>Rs 150.50</h2>
</div>
<div className='flex border-2 active:border-black  mb-2 rounded-xl w-full p-3 items-center justify-between'>
  <img className='h-12' src={Moto} alt="Moto Car" />
  <div className='ml-2 w-[80%]'>
  <h4 className='font-medium text-lg'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
  <h5 className='font-medium text-sm'>3 mins away</h5>
  <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
  </div>
  <h2 className='text-lg font-semibold'>Rs 90.33</h2>
</div>
<div className='flex border-2 active:border-black  mb-2 rounded-xl w-full p-3 items-center justify-between'>
  <img className='h-12' src={Auto} alt="Autorikshaw" />
  <div className=' ml-2 w-[80%]'>
  <h4 className='font-medium text-lg'>UberAuto <span><i className="ri-user-3-fill"></i>4</span></h4>
  <h5 className='font-medium text-sm'>4 mins away</h5>
  <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
  </div>
  <h2 className='text-lg font-semibold'>Rs 70.50</h2>
</div>



      </div>
    </div>
  )
}

export default Home



