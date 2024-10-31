import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/DeviceAvailability.css';

function CheckAvailability() {

  const [devices,setDevices]=useState([]);
  const [password,setPassword]=useState('');
  const [selectedDevice,setSelectedDevice]=useState('');
  const [availability,setAvailability]=useState('');

  useEffect(()=>{
    axios.get('http://localhost:5000/devices')
    .then((resp)=>setDevices(resp.data))
    .catch((err)=>console.error('Error in Fetching Devices', err))
  },[])

  const handleCheckAvaialability=()=>{
    if(!selectedDevice || !password){
      alert('Please select a device and enter password');
      return;
    }
    axios.post('http://localhost:5000/check_availability',{deviceId:selectedDevice,password})

    // .then(response=>console.log(response.data.message))
    // .catch(err=>console.log(err.response?.data?.message))

    .then(response=>setAvailability(response.data.message))
    .catch(err=>setAvailability(err.response?.data?.message))
    
  }

  return (
    <div className='container'>
      <h2>Check Availability of Devices</h2>
      <select onChange={(event)=>setSelectedDevice(event.target.value)} value={selectedDevice}>
        <option value="">Select a Device</option>
        {
          devices.map((device)=>(
            <option key={device._id} value={device._id}>{device.deviceName}</option>
          ))
        }
      </select>
      <input
       type="password"
        placeholder='Enter Password..' 
        value={password}
        onChange={(event)=>setPassword(event.target.value)} />
        <button onClick={handleCheckAvaialability}>Check Availability</button>

        {/* displaying the Device Availability Status  */}
        {availability&&<h3>Availability Status:{availability}</h3>}
    </div>
  )
}

export default CheckAvailability