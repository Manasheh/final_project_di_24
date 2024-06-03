import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../App';

const ViewImage = () => {
    const { imageId } = useParams();
    const { token } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchImage();
    }, [imageId]);

    const fetchImage = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/getSingleImage/${imageId}`, {
                headers: { 'x-access-token': token },
                withCredentials: true
            });
           /// change header to x-access-token
            setImage(res.data);
            setDescription(res.data.description || '');  // Assuming your response has a description field
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const saveDescription = async () => {
        setLoading(true);
        try {
            const res = await axios.put(`http://localhost:8080/updateDescription/${imageId}`, {
                description: description
            }, {
                headers: { 'x-access-token': token },
                withCredentials: true
            });
            setImage({...image, description: description}); // Update local state with new description
            console.log('Description updated successfully');
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
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
            <button onClick={saveDescription} disabled={loading}>
                {loading ? 'Saving...' : 'Save Description'}
            </button>
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

//     useEffect(() => {
//         fetchImage();
//     }, [imageId]);

//     const fetchImage = async () => {
//         try {
//             const res = await axios.get(`http://localhost:8080/getSingleImage/${imageId}`, {
//                 headers: { 'x-access-token': token },
//                 withCredentials: true
//             });
//             setImage(res.data);
//         } catch (error) {
//             console.log(error.response?.data?.msg || error.message);
//         }
//     };

//     if (!image) return <div>Loading...</div>;

//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'black' }}>
//             <img src={image.image_url} alt="Full Screen" style={{ maxHeight: '100%', maxWidth: '100%' }} />
//         </div>
//     );
// };

// export default ViewImage;
