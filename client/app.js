import React from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Navbar } from './components';
import HomePage from './components/HomePage';
import Routes from './routes';
const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes />
      <HomePage />
      {/* <ToastContainer /> */}
    </div>
  );
};

export default App;
