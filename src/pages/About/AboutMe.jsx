import React from 'react';
import './aboutMe.css';

const AboutMe = () => (
  <div className="about-me-container">
    <h2 className="about-me-title">About Me</h2>
    <div className="about-me-content">
      <p>
        Hi there! My name is Nelly Telli, and I&apos;m a software engineer with a passion
        for web development and problem-solving. I love building responsive web
        applications and creating clean, maintainable code.
      </p>
      <br />
      <p>
        My favorite quote is,
        {' '}
        <strong>
          &ldquo;The only way to do great work is to love what you
          do&rdquo;
        </strong>
        {' '}
        by Steve Jobs. I strongly believe in the importance of loving your
        work and staying curious to keep learning and growing.
      </p>
    </div>
  </div>
);

export default AboutMe;
