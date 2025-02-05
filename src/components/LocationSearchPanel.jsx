import React from 'react'

const LocationSearchPanel = (props) => {
  console.log(props);

  //sample array for location
  const location = [
    "Boudha Stupa, Boudhanath, Kathmandu",
    "Patan Durbar Square, Mangal Bazaar, Lalitpur",
    "Bhaktapur Durbar Square, Bhaktapur",
    "Garden of Dreams, Tridevi Marg, Kathmandu"
  ]

  return (
    <div>{/*this is just a sample data*/}
    {
      location.map(function(elem,idx){
        return <div key={idx} onClick={()=>{
          props.setVehiclePanel(true)
          props.setPanelOpen(false)
        }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl item-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-7 flex items-center justify-center w-7 rounded-full'>
          <i className="ri-map-pin-line "></i></h2>
        <h4 className='font-medium'>{elem}</h4>
      </div>
      })
    }
    </div>
  )
}

export default LocationSearchPanel