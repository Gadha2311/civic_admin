import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AdminAuthprovider } from './context/adminAuthcontext';
// import FileUpload from './components/sidebar/fileUpload';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminAuthprovider>
    <App />
    {/* <FileUpload/> */}
    </AdminAuthprovider>
  </React.StrictMode>
);

