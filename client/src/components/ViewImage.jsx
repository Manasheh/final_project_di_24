import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../App';
import { Button, Form } from 'react-bootstrap';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ViewImage.css';

const ViewImage = () => {
  const { imageId } = useParams();
  const { token } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setIsPublic(res.data.isPublic || false);
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
          isPublic: isPublic
        },
        {
          headers: { 'x-access-token': token },
          withCredentials: true
        }
      );
      setImage({ ...image, description: description, isPublic: isPublic });
      console.log('Description updated successfully');
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'blob'
      });
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
        fetchImage();
      } catch (error) {
        console.log('Error deleting image:', error.response?.data?.message || error.message);
      }
    }
  };

  if (!image) return <div>Loading...</div>;

  return (
    <div className="view-image-container">
      <img src={image.image_url} alt={description || "Displayed Image"} className="full-size-image" />
      <div className="description-container">
        <Form.Control
          as="textarea"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter image description here..."
          className="description-input"
        />
        <Form.Check
          type="checkbox"
          label="Is Public"
          checked={isPublic}
          onChange={handleCheckboxChange}
          className="public-checkbox"
        />
        <Button onClick={saveDescription} disabled={loading} className="save-button">
          {loading ? 'Saving...' : 'Save Description'}
        </Button>
      </div>
      <div className="action-buttons">
        <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="delete-icon" />
        <FontAwesomeIcon icon={faDownload} onClick={() => handleDownload(image.image_url)} className="download-icon" />
      </div>
    </div>
  );
};

export default ViewImage;





