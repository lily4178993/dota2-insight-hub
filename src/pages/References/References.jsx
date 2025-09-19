import React from 'react';
import './references.css';

function References() {
  const referencesList = [
    {
      name: 'Dota 2 API',
      description: 'Official API for Dota 2 game data.',
      link: 'https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Scripting/API',
    },
    {
      name: 'React.js',
      description: 'JavaScript library for building user interfaces.',
      link: 'https://reactjs.org',
    },
    {
      name: 'Redux Toolkit',
      description: 'State management library for React applications.',
      link: 'https://redux-toolkit.js.org',
    },
    {
      name: 'OpenAI GPT-3.5',
      description: 'Natural language processing AI model developed by OpenAI.',
      link: 'https://openai.com/gpt-3',
    },
    {
      name: 'Codegrid React Navigation Menu Tutorial',
      description: 'Tutorial on implementing navigation menu and styles in React.',
      link: 'https://youtu.be/YAjENHeD2TM',
    },
    {
      name: 'Icons8',
      description: 'Provider of the application favicon.',
      link: 'https://icons8.com',
    },
    {
      name: 'Nelson Sakwa',
      description: 'Provider of the application original design idea.',
      link: 'https://www.behance.net/sakwadesignstudio',
    },
  ];

  return (
    <div className="references-container">
      <h2>References</h2>
      <ul className="references-list">
        {referencesList.map((reference, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} className="reference-item">
            <h3>{reference.name}</h3>
            <p>{reference.description}</p>
            <a href={reference.link} target="_blank" rel="noopener noreferrer">
              {reference.link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default References;
