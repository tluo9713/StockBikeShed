import React from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import TopBar from './components/NavBar';
import Routes from './routes';
const App = () => {
  return (
    <div>
      <TopBar />
      <Routes />
      {/* <ToastContainer /> */}
    </div>
  );
};

export default App;
