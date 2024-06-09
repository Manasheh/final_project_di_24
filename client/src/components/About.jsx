import React from 'react';
import './About.css';
// Import Image component from react-bootstrap
import Img from '../../public/images/fam.avif';

function About() {
  return (
    <div className="about-container">
      <div className="about-img">
        {/* Use Image component from React-Bootstrap */}
        <img src={Img} fluid alt="Happy Family" />
      </div>
      <div className="about-bg">
        <h4>
          <em>
            Welcome to the Family Nest platform! This platform is dedicated to providing you with a seamless experience to store, share, download, and delete images. Whether you're an avid photographer or simply love capturing moments, this platform empowers you to curate your visual stories effortlessly.

            With its intuitive interface, you can upload your images with ease, organize them efficiently, and share your unique perspective with the world. Need to access your images on the go? No problem! This platform ensures your images are accessible anytime, anywhere.
          </em>
        </h4>
      </div>
    </div>
  );
}

export default About;
