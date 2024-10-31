import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/DeviceRegister.css';

function DeviceRegisterForm() {
    const [deviceName, setDeviceName] = useState('');
    const [deviceIp, setDeviceIp] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const isValidPassword = (password) => {
        return password.length >= 6; 
    }
    const isValidInput = (deviceName) => {
        return deviceName.trim()!== '';
    }
    const isValidIpAddress = (deviceIp) => {
        return (deviceIp.length>=12 && deviceIp.length<=15);   //for ipv4
    }
    const handleFormSubmission = async (event) => {
        event.preventDefault();

        if(!isValidInput(deviceName)) {
            alert('Device Name cannot be empty.');
            return;
        }
        if(!isValidIpAddress(deviceIp)){
            alert('Please check the Ip Address');
            return;
        }

        if (!isValidPassword(password)) {
            alert('Password must be at least 6 characters long.');
            return;
        }
        

        const deviceData = { deviceName, deviceIp, password };

        try {
            const result = await axios.post('http://localhost:5000/add_device', deviceData);
            console.log(result.data);
            // alert('Form Submitted successfully');
            
            alert(result.data);
            navigate('/check_availability');
        } catch (err) {
            console.error('Error in Submission:', err);
            alert('Failed to submit the form. Please try again.');
        }
    }

    return (
        <div className='device-register'>
            <form>
                <h1>Register a Device</h1>
                <label htmlFor="DeviceName">Enter the Device Name</label>
                <input 
                    type='text' id="DeviceName" placeholder='ex: Device001' 
                    value={deviceName}
                    onChange={(event) => setDeviceName(event.target.value)} 
                    required />
                <label htmlFor="DeviceIP">Enter the Device IP Address</label>
                <input 
                    type='text' id="DeviceIP" placeholder='ex: 198.156.0.1' 
                    value={deviceIp} 
                    onChange={(event) => setDeviceIp(event.target.value)}
                    required />
                <label htmlFor="Password">Enter the Password</label>
                <input
                    type='password' id="Password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required />
                <button type="submit" onClick={handleFormSubmission}>Submit</button>
            </form>
        </div>
    )
}

export default DeviceRegisterForm;
