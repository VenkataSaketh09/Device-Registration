import React from 'react';
import DeviceRegisterForm from './components/UserForm';
import CheckAvailability from './components/CheckAvailability';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
  return(
  <Router>
    <Routes>
      <Route path='/' element={<DeviceRegisterForm/>}/>
      <Route path='/check_availability' element={<CheckAvailability/>}/>
    </Routes>
  </Router>)
}

export default App;
