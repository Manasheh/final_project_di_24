import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';
import { AuthContext } from '../App';
import { FaFacebook, FaWhatsapp, FaCopy, FaDownload } from 'react-icons/fa'; // Import Font Awesome icons
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

  const shareViaFacebook = (imageUrl) => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`, '_blank');
  };

  const shareViaWhatsApp = (imageUrl) => {
    const whatsappMessage = `Check out this image: ${imageUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyImageLink = (imageUrl) => {
    navigator.clipboard.writeText(imageUrl)
      .then(() => {
        alert('Image link copied to clipboard!');
      })
      .catch(error => {
        console.error('Failed to copy image link:', error);
      });
  };

  const downloadImage = (imageUrl) => {
    try {
      // Make a GET request to the image URL to download it
      axios.get(imageUrl, {
        responseType: 'blob' // Set responseType to 'blob' to download binary data
      })
      .then(response => {
        // Use FileSaver.js to save the blob as a file
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
      console.log('Error downloading image:', error);
    }
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
            </div>
            <div className="button-container">
              <Button variant="light" onClick={() => shareViaFacebook(image.image_url)}><FaFacebook /></Button>
              <Button variant="light" onClick={() => shareViaWhatsApp(image.image_url)}><FaWhatsapp /></Button>
              <Button variant="light" onClick={() => copyImageLink(image.image_url)}><FaCopy /></Button>
              <Button variant="light" onClick={() => downloadImage(image.image_url)}><FaDownload /></Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;






