import React from 'react';
import './About.css';

const About = () => (

  <div className="about-div">
    <h2>About</h2>
    <p>
      Catalog of SpaceX Launch Missions fetched from
      <a target="_blank" rel="noopener noreferrer" href="https://api.spacexdata.com/"><span> https://api.spacexdata.com/</span></a>
      {' '}
    </p>
  </div>

);

export default About;
