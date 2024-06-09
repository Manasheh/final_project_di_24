import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import { AuthContext } from '../App';
import './Home.css'; // Import CSS file for custom styling

const Home = () => {
  const [publicImages, setPublicImages] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    getPublicImages();
  }, []);

  const getPublicImages = async () => {
    try {
      const response = await axios.get('https://final-project-di-24.onrender.com/getUserImage', {
        headers: {
          'x-access-token': token
        },
        withCredentials: true
      });

      // Filter the images to only include those marked as public
      const publicImages = response.data.filter(image => image.isPublic === true || image.isPublic === 'true');
      setPublicImages(publicImages);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      // Make a GET request to the image URL to download it
      const response = await axios.get(imageUrl, {
        responseType: 'blob' // Set responseType to 'blob' to download binary data
      });
      // Use FileSaver.js to save the blob as a file
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'image.jpg');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log('Error downloading image:', error);
    }
  };
  const handleImageClick = (imageId) => {
    navigate(`/image/${imageId}`);
};

  return (
    <Container className="home-container">
  <div className="heading-container">
    <h2 className='heading'>Public Images</h2>
  </div>
  <div className="image-container">
    {publicImages.map(image => (
      <div key={image.id} className="image-wrapper-home">
        <div className='image-container-home'>
          <img src={image.image_url} alt={`Image ${image.id}`} className="image" />
          {/* <p>Description: {image.description}</p> */}
          onClick={() => handleImageClick(image_url)}
        </div>
        <div className="download-button-container">
          <Button variant="primary" size="sm" className='home-button' onClick={() => handleDownload(image.image_url)}>Download</Button>
        </div>
      </div>
    ))}
  </div>
</Container>

  );
};

export default Home;













// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { Button, Container } from 'react-bootstrap';
// import { AuthContext } from '../App';
// // import './Home.css'; // Import CSS file for custom styling

// const Home = () => {
//   const [publicImages, setPublicImages] = useState([]);
//   const { token } = useContext(AuthContext);

//   useEffect(() => {
//     getPublicImages();
//   }, []);

//   const getPublicImages = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/getUserImage', {
//         headers: {
//           'x-access-token': token
//         },
//         withCredentials: true
//       });

//       // Filter the images to only include those marked as public
//       const publicImages = response.data.filter(image => image.isPublic === true || image.isPublic === 'true');
//       setPublicImages(publicImages);
//     } catch (error) {
//       console.log(error.response.data.message);
//     }
//   };

//   const handleDownload = async (imageUrl) => {
//     try {
//       // Make a GET request to the image URL to download it
//       const response = await axios.get(imageUrl, {
//         responseType: 'blob' // Set responseType to 'blob' to download binary data
//       });
//       // Use FileSaver.js to save the blob as a file
//       const blob = new Blob([response.data], { type: 'image/jpeg' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'image.jpg');
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       console.log('Error downloading image:', error);
//     }
//   };

//   return (
//     <Container className="image-container">
//       <div>
//         <h2 className='heading'>Public Images</h2>
//       </div>
//       {publicImages.map(image => (
//         <div key={image.id} className="image-wrapper">
//           <div className="image">
//             <img src={image.image_url} alt={`Image ${image.id}`} />
//             <p>Description: {image.description}</p>
//           </div>
//           <Button variant="primary" onClick={() => handleDownload(image.image_url)}>Download</Button>
//         </div>
//       ))}
//     </Container>
//   );
// };

// export default Home;











//wednesday 9th night june 2021
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { saveAs } from 'file-saver'; // Import the saveAs function from file-saver
// import { AuthContext } from '../App';
// import Button from react-bootstrap/Button;

// const Home = () => {
//   const [publicImages, setPublicImages] = useState([]);
//   const { token } = useContext(AuthContext);

//   useEffect(() => {
//     getPublicImages();
//   }, []);

//   const getPublicImages = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/getUserImage', {
//         headers: {
//           'x-access-token': token
//         },
//         withCredentials: true
//       });

//       // Filter the images to only include those marked as public
//       const publicImages = response.data.filter(image => image.isPublic === true || image.isPublic === 'true');
//       setPublicImages(publicImages);
//     } catch (error) {
//       console.log(error.response.data.message);
//     }
//   };

//   const handleDownload = async (imageUrl) => {
//     try {
//       // Make a GET request to the image URL to download it
//       const response = await axios.get(imageUrl, {
//         responseType: 'blob' // Set responseType to 'blob' to download binary data
//       });
//       // Use FileSaver.js to save the blob as a file
//       saveAs(response.data, 'image.jpg');
//     } catch (error) {
//       console.log('Error downloading image:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Public Images</h2>
//       {publicImages.map(image => (
//         <div key={image.id}>
//           <img src={image.image_url} alt={`Image ${image.id}`} />
//           <p>Description: {image.description}</p>
//           <button onClick={() => handleDownload(image.image_url)}>Download</button> {/* Add a download button for each image */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;








// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../App';
// import ImageShareButtons from './ImageShareButtons'; // Import the ImageShareButtons component

// const Home = () => {
//   const [publicImages, setPublicImages] = useState([]);
//   const { token } = useContext(AuthContext);

//   useEffect(() => {
//     getPublicImages();
//   }, []);

//   const getPublicImages = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/getUserImage', {
//         headers: {
//           'x-access-token': token?.token
//         },
//         withCredentials: true
//       });

//       // Filter the images to only include those marked as public
//       const publicImages = response.data.filter(image => image.isPublic === true || image.isPublic === 'true');
//       setPublicImages(publicImages);
//     } catch (error) {
//       console.log(error.response.data.message);
//     }
//   };

//   const shareImage = (imageUrl) => {
//     // Implement the share functionality for the specific image URL
//     // You can open a modal or a share dialog for the user to select the platform
//     // For simplicity, you can use window.open to open the share dialog for now
//     window.open(imageUrl); // Replace this with the actual share functionality
//   };

//   const handleDownload = async (imageUrl) => {
//     try {
//       // Make a GET request to the image URL to download it
//       const response = await axios.get(imageUrl, {
//         responseType: 'blob' // Set responseType to 'blob' to download binary data
//       });
//       // Create a temporary URL to download the image blob
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       // Create a temporary link element to trigger the download
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'image.jpg'); // Set the filename for the downloaded image
//       document.body.appendChild(link);
//       link.click(); // Simulate a click event to trigger the download
//       // Cleanup: remove the temporary URL and link element
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(link);
//     } catch (error) {
//       console.log('Error downloading image:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Public Images</h2>
//       {publicImages.map(image => (
//         <div key={image.id}>
//           <img src={image.image_url} alt={`Image ${image.id}`} />
//           <p>Description: {image.description}</p>
//           <ImageShareButtons imageUrl={image.image_url} /> {/* Pass the image URL to the ImageShareButtons component */}
//           <button onClick={() => shareImage(image.image_url)}>Share</button> {/* Add a share button for each image */}
//           <button onClick={() => handleDownload(image.image_url)}>Download</button> {/* Add a download button for each image */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;









// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../App';

// const Home = () => {
//   const [publicImages, setPublicImages] = useState([]);
//   const { token } = useContext(AuthContext);

//   useEffect(() => {
//     getPublicImages();
//   }, []);

//   const getPublicImages = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/getUserImage', {
//         headers: {
//           'x-access-token': token?.token
//         },
//         withCredentials: true
//       });

//       // Filter the images to only include those marked as public
//       console.log('home photo', response.data);

//       const publicImages = response.data.filter(image => image.isPublic === true || image.isPublic === 'true');

//       console.log('public images heree', publicImages);

//       setPublicImages(publicImages);
//     } catch (error) {
//       console.log(error.response.data.message);
//     }
//   };
// console.log(publicImages)
//   return (
//     <div>
//       <h2>Public Images</h2>
//       {publicImages.map(image => (
//         <div key={image.id}>
//           <img src={image.image_url} alt={`Image ${image.id}`} />
//           <p>Description: {image.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;
