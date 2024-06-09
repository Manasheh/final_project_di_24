import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaFacebook, FaWhatsapp, FaCopy } from 'react-icons/fa'; // Import Font Awesome icons

const ImageShareButtons = ({ imageUrl }) => {
  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`, '_blank');
  };

  const shareViaWhatsApp = () => {
    const whatsappMessage = `Check out this image: ${imageUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyImageLink = () => {
    navigator.clipboard.writeText(imageUrl)
      .then(() => {
        alert('Image link copied to clipboard!');
      })
      .catch(error => {
        console.error('Failed to copy image link:', error);
      });
  };

  return (
    <div>
      <Button onClick={shareViaFacebook} variant="light"><FaFacebook /></Button>
      <Button onClick={shareViaWhatsApp} variant="light"><FaWhatsapp /></Button>
      <Button onClick={copyImageLink} variant="light"><FaCopy /></Button>
    </div>
  );
};

export default ImageShareButtons;

