import React from 'react';

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
      <button onClick={shareViaFacebook}>Share via Facebook</button>
      <button onClick={shareViaWhatsApp}>Share via WhatsApp</button>
      <button onClick={copyImageLink}>Copy Image Link</button>
    </div>
  );
};

export default ImageShareButtons;
