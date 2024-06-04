import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../App';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ViewImage = () => {
  const { imageId } = useParams();
  const { token } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false); // Add state for isPublic checkbox
  const [loading, setLoading] = useState(false);
    // const [message, setMessage] = useState('');

  useEffect(() => {
    fetchImage();
  }, [imageId]);

  const fetchImage = async () => {
    try {
      const res = await axios.get(`https://final-project-di-24.onrender.com/getSingleImage/${imageId}`, {
        headers: { 'x-access-token': token },
        withCredentials: true
      });
      setImage(res.data);
      setDescription(res.data.description || '');
      setIsPublic(res.data.isPublic || false); // Set isPublic state based on image data
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleCheckboxChange = event => {
    setIsPublic(event.target.checked);
  };

  const saveDescription = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `https://final-project-di-24.onrender.com/updateDescription/${imageId}`,
        {
          description: description,
          isPublic: isPublic // Include isPublic in the request body
        },
        {
          headers: { 'x-access-token': token },
          withCredentials: true
        }
      );
      setImage({ ...image, description: description, isPublic: isPublic }); // Update local state with new description and isPublic
      console.log('Description updated successfully');
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = async (imageUrl) => {
    try {
      // Make a GET request to the image URL to download it
      const response = await axios.get(imageUrl, {
        responseType: 'blob' // Set responseType to 'blob' to download binary data
      });
      // Use FileSaver.js to save the blob as a file
      saveAs(response.data, 'image.jpg');
    } catch (error) {
      console.log('Error downloading image:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await axios.delete(`https://final-project-di-24.onrender.com/deleteImage/${imageId}`, {
          headers: { 'x-access-token': token },
          withCredentials: true
        });
        console.log('Image deleted successfully');
        // Fetch available images after deletion
        fetchImage();
      } catch (error) {
        console.log('Error deleting image:', error.response?.data?.message || error.message);
      }
    }
  };
  
  

  if (!image) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', background: 'black' }}>
      <img src={image.image_url} alt={description || "Displayed Image"} style={{ maxHeight: '80%', maxWidth: '80%' }} />
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter image description here..."
        style={{ width: '80%', marginTop: '20px' }}
      />
      <label>
        Is Public:
        <input
          type="checkbox"
          checked={isPublic}
          onChange={handleCheckboxChange}
          style={{ marginLeft: '10px' }}
        />
      </label>
      <button onClick={saveDescription} disabled={loading}>
        {loading ? 'Saving...' : 'Save Description'}
      </button>
      <FontAwesomeIcon icon={faTrash} onClick= {handleDelete} />

      <FontAwesomeIcon icon= {faDownload} onClick={() => handleDownload(image.image_url)}/>

    </div>
  );
};

export default ViewImage;




// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { AuthContext } from '../App';

// const ViewImage = () => {
//     const { imageId } = useParams();
//     const { token } = useContext(AuthContext);
//     const [image, setImage] = useState(null);
//     const [description, setDescription] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         fetchImage();
//     }, [imageId]);

//     const fetchImage = async () => {
//         try {
//             const res = await axios.get(`http://localhost:8080/getSingleImage/${imageId}`, {
//                 headers: { 'x-access-token': token },
//                 withCredentials: true
//             });
//            /// change header to x-access-token
//             setImage(res.data);
//             setDescription(res.data.description || '');  // Assuming your response has a description field
//         } catch (error) {
//             console.log(error.response?.data?.message || error.message);
//         }
//     };

//     const handleDescriptionChange = (event) => {
//         setDescription(event.target.value);
//     };

//     const saveDescription = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.put(`http://localhost:5173/updateDescription/${imageId}`, {
//                 description: description
//             }, {
//                 headers: { 'x-access-token': token },
//                 withCredentials: true
//             });
//             setImage({...image, description: description}); // Update local state with new description
//             console.log('Description updated successfully');
//         } catch (error) {
//             console.log(error.response?.data?.message || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!image) return <div>Loading...</div>;

//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh', background: 'black' }}>
//             <img src={image.image_url} alt={description || "Displayed Image"} style={{ maxHeight: '80%', maxWidth: '80%' }} />
//             <textarea
//                 value={description}
//                 onChange={handleDescriptionChange}
//                 placeholder="Enter image description here..."
//                 style={{ width: '80%', marginTop: '20px' }}
//             />
//             <button onClick={saveDescription} disabled={loading}>
//                 {loading ? 'Saving...' : 'Save Description'}
//             </button>
//         </div>
//     );
// };

// export default ViewImage;






// // import React, { useState, useEffect, useContext } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import { AuthContext } from '../App';

// // const ViewImage = () => {
// //     const { imageId } = useParams();
// //     const { token } = useContext(AuthContext);
// //     const [image, setImage] = useState(null);

// //     useEffect(() => {
// //         fetchImage();
// //     }, [imageId]);

// //     const fetchImage = async () => {
// //         try {
// //             const res = await axios.get(`http://localhost:8080/getSingleImage/${imageId}`, {
// //                 headers: { 'x-access-token': token },
// //                 withCredentials: true
// //             });
// //             setImage(res.data);
// //         } catch (error) {
// //             console.log(error.response?.data?.msg || error.message);
// //         }
// //     };

// //     if (!image) return <div>Loading...</div>;

// //     return (
// //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'black' }}>
// //             <img src={image.image_url} alt="Full Screen" style={{ maxHeight: '100%', maxWidth: '100%' }} />
// //         </div>
// //     );
// // };

// // export default ViewImage;
