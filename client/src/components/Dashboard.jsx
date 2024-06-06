import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { Form, Button, Image, Container } from 'react-bootstrap';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver'; // Import the saveAs function from file-saver
import './Dashboard.css';

const Dashboard = () => {
    const { token } = useContext(AuthContext);
    const [userImages, setUserImages] = useState([]);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserImages();
    }, []);

    const fetchUserImages = async () => {
        try {
            const res = await axios.get("https://final-project-di-24.onrender.com/getUserImage", {
                headers: { 'x-access-token': token },
                withCredentials: true
            });
            setUserImages(res.data);
        } catch (error) {
            console.log(error.response?.data?.msg || error.message);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", description);
        formData.append("isPublic", isPublic); // Add isPublic to the form data

        try {
            const res = await axios.post("https://final-project-di-24.onrender.com/upload-single", formData, {
                headers: {
                    'x-access-token': token,
                    "Content-Type": "multipart/form-data"
                }
            });
            setMessage("Image uploaded successfully");
            fetchUserImages(); // Fetch updated list of images after upload
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
        }
    };

    const handleDelete = async (imageId) => {
        try {
            await axios.delete(`https://final-project-di-24.onrender.com/deleteImage/${imageId}`, {
                headers: { 'x-access-token': token },
                withCredentials: true
            });
            setMessage("Image deleted successfully");
            fetchUserImages(); // Fetch updated list of images after deletion
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
        }
    };

    const handleImageClick = (imageId) => {
        navigate(`/image/${imageId}`);
    };

    const handleIsPublicChange = (e) => {
        setIsPublic(e.target.checked);
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

    return (
        <Container className='dashboard-container'>
            {/* Upload form */}
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="description">
            <Form.Control type="text" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
            </Form.Group>
            <Form.Group controlId="isPublic">
            <Form.Check type="checkbox" label="Public" checked={isPublic} onChange={handleIsPublicChange} />
            </Form.Group>
            <div className="upload-button-container">
            <Button variant="primary" type="submit">Upload</Button>
            </div>
            </Form>
            {message && <div>{message}</div>}

            <h2 className='heading'>Dashboard</h2>
            <div className='image-container'>
  {/* Render user's images */}
  {userImages.map((image) => (
    <div key={image.id} className='image-wrapper'>
      <div className="image-wrapper-relative">
        <Image src={image.image_url} className='image' alt="User Image" onClick={() => handleImageClick(image.id)} />
        <div className="icon-container">
          <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(image.id)} />
          <FontAwesomeIcon icon={faDownload} onClick={() => handleDownload(image.image_url)} />
        </div>
      </div>
      <p>Description: {image.description}</p>
    </div>
  ))}
</div>
        </Container>
    );
};

export default Dashboard;








// import axios from 'axios';
// import { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../App';
// import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



// const Dashboard = () => {
//     const { token } = useContext(AuthContext);
//     const [userImages, setUserImages] = useState([]);
//     const [file, setFile] = useState(null);
//     const [description, setDescription] = useState("");
//     const [message, setMessage] = useState("");
//     const [isPublic, setIsPublic] = useState(false)
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchUserImages();
//     }, []);

//     const fetchUserImages = async () => {
//         try {
//             const res = await axios.get("http://localhost:8080/getUserImage", { 
//                 headers: { 'x-access-token': token }, 
//                 withCredentials: true 
//             });
//             setUserImages(res.data);
//         } catch (error) {
//             console.log(error.response?.data?.msg || error.message);
//         }
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleDescriptionChange = (e) => {
//         setDescription(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("description", description);
//         formData.append("isPublic", isPublic) // Add isPublic to the form data

//         try {
//             const res = await axios.post("http://localhost:8080/upload-single", formData, {
//                 headers: {
//                     'x-access-token': token,
//                     "Content-Type": "multipart/form-data"
//                 }
//             });
//             setMessage("Image uploaded successfully");
//             fetchUserImages(); // Fetch updated list of images after upload
//         } catch (error) {
//             setMessage(error.response?.data?.message || error.message);
//         }
//     };

//     const handleDelete = async (imageId) => {
//         try {
//             await axios.delete(`http://localhost:8080/deleteImage/${imageId}`, {
//                 headers: { 'x-access-token': token },
//                 withCredentials: true
//             });
//             setMessage("Image deleted successfully");
//             fetchUserImages(); // Fetch updated list of images after deletion
//         } catch (error) {
//             setMessage(error.response?.data?.message || error.message);
//         }
//     };

//     const handleImageClick = (imageId) => {
//         navigate(`/image/${imageId}`);
//     };

//     const handleIsPublicChange = (e) => { 
//         setIsPublic(e.target.checked)
//     }

    
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
//     return (
//         <div>
//             {/* Upload form */}
//             <form onSubmit={handleSubmit}>
//                 <input type="file" accept="image/*" onChange={handleFileChange} />
//                 <input type="text" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
//                 <input type="checkbox" checked={isPublic} onChange={handleIsPublicChange} />
//                 <label htmlFor="isPublic">Public</label>
//                 <button type="submit">Upload</button>
//             </form>
//             {message && <div>{message}</div>}

//             <h2>Dashboard</h2>
//             <div>
//                 {/* Render user's images */}
//                 {userImages.map((image) => (
//                     <div key={image.id}>
//                         <img 
//                             src={image.image_url} 
//                             alt="User Image" 
//                             onClick={() => handleImageClick(image.id)} 
//                             style={{ cursor: 'pointer' }}
                            
//                         />
//                         <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(image.id)}/>
//                         <FontAwesomeIcon icon= {faDownload} onClick={() => handleDownload(image.image_url)}/>
//                         <p>Description: {image.description}</p>
//                         {/* <button onClick={() => handleDelete(image.id)}>Delete</button>/ */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;




// import axios from 'axios';
// import { useEffect, useState, useContext } from 'react';
// import { AuthContext } from '../App';

// const Dashboard = () => {
//     const { token } = useContext(AuthContext);
//     const [userImages, setUserImages] = useState([]);
//     const [file, setFile] = useState(null);
//     const [description, setDescription] = useState("");
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         fetchUserImages();
//     }, []);

//     const fetchUserImages = async () => {
//         try {
//             const res = await axios.get("http://localhost:8080/getUserImage", { 
//                 headers: { 'x-access-token': token }, 
//                 withCredentials: true 
//             });
//             setUserImages(res.data);
//         } catch (error) {
//             console.log(error.response?.data?.msg || error.message);
//         }
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleDescriptionChange = (e) => {
//         setDescription(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("description", description);

//         try {
//             const res = await axios.post("http://localhost:8080/upload-single", formData, {
//                 headers: {
//                     'x-access-token': token,
//                     "Content-Type": "multipart/form-data"
//                 }
//             });
//             setMessage("Image uploaded successfully");
//             fetchUserImages(); // Fetch updated list of images after upload
//         } catch (error) {
//             setMessage(error.response?.data?.message || error.message);
//         }
//     };

//     const handleDelete = async (imageId) => {
//         try {
//             await axios.delete(`http://localhost:8080/deleteImage/${imageId}`, {
//                 headers: { 'x-access-token': token },
//                 withCredentials: true
//             });
//             setMessage("Image deleted successfully");
//             fetchUserImages(); // Fetch updated list of images after deletion
//         } catch (error) {
//             setMessage(error.response?.data?.message || error.message);
//         }
//     };

//     return (
//         <div>
//             {/* Upload form */}
//             <form onSubmit={handleSubmit}>
//                 <input type="file" accept="image/*" onChange={handleFileChange} />
//                 <input type="text" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
//                 <button type="submit">Upload</button>
//             </form>
//             {message && <div>{message}</div>}

//             <h2>Dashboard</h2>
//             <div>
//                 {/* Render user's images */}
//                 {userImages.map((image) => (
//                     <div key={image.id}>
//                         <img src={image.image_url} alt="User Image" />
//                         <p>Description: {image.description}</p>
//                         <button onClick={() => handleDelete(image.id)}>Delete</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;






