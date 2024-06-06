import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import './Footer.css'; // Import your custom CSS file for styling
import './Footer.css';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start">
      <Container className="mt-5 p-1" >
        <Row>
          <Col md={6} lg={6}>
            <div className="project">
              <h3>MENASHE VAIPHEI</h3>
              <p>
                🚀 Full-stack Developer | 🔍 Always Learning | 💻 Making Code
                Work
              </p>
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className="footer">
              <div className="social-container">
                <a href="#">
                  <img src="https://img.icons8.com/?size=100&id=118467&format=png&color=000000" alt="" />
                </a>
              </div>
              <div className="social-container">
                <a href="#">
                  <img src="https://img.icons8.com/?size=100&id=32309&format=png&color=000000" alt="" />
                </a>
              </div>
              <div className="social-container">
                <a
                  href="https://www.linkedin.com/in/menashe-vaiphei-924476119/"
                >
                  <img src="https://img.icons8.com/?size=100&id=8808&format=png&color=000000" alt="" />
                </a>
              </div>
              <div className="social-container">
                <a href="#">
                  <img src="https://img.icons8.com/?size=100&id=55200&format=png&color=000000" alt="" />
                </a>
              </div>
              <div className="social-container">
                <a href="https://github.com/Manasheh/portfolio">
                  <img src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000" alt="" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="text-center p-3">
        © 2024 Copyright:
        <a style={{ color: 'blue' }} href="#home-section">
          Made by Menashe
        </a>
      </div>
    </footer>
  );
}

export default Footer;
