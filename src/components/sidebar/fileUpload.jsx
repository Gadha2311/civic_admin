// import React, { useState } from 'react';
// import Axios from '../../axios'; 

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await Axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setUploadStatus(response.data.message);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setUploadStatus('Error uploading file.');
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload File</button>
//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// };

// export default FileUpload;
