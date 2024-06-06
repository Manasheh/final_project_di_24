import React from 'react';
import Button from 'react-bootstrap/Button';
const ImageShareButtons = ({ imageUrl }) => {
  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`, '_blank');
  };

  const shareViaWhatsApp = () => {
    window.open(`whatsapp://send?text=Check out this image: ${encodeURIComponent(imageUrl)}`, '_blank');
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
      <Button onClick={shareViaFacebook}>Share via Facebook</Button>
      <Button onClick={shareViaWhatsApp}>Share via WhatsApp</Button>
      <Button onClick={copyImageLink}>Copy Image Link</Button>
    </div>
  );
};

export default ImageShareButtons;
