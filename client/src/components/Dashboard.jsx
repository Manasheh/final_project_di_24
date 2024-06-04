import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Dashboard = () => {
    const { token } = useContext(AuthContext);
    const [userImages, setUserImages] = useState([]);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
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

    return (
        <div>
            {/* Upload form */}
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <input type="text" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <div>{message}</div>}

            <h2>Dashboard</h2>
            <div>
                {/* Render user's images */}
                {userImages.map((image) => (
                    <div key={image.id}>
                        <img 
                            src={image.image_url} 
                            alt="User Image" 
                            onClick={() => handleImageClick(image.id)} 
                            style={{ cursor: 'pointer' }}
                            
                        />
                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(image.id)}/>

                        {/* <p>Description: {image.description}</p> */}
                        {/* <button onClick={() => handleDelete(image.id)}>Delete</button>/ */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;




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






