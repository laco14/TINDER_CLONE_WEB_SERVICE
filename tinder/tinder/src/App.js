import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProfiles(10);
  }, []);

  const fetchProfiles = async (n) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/profiles?n=${n}`);
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const handleSwipe = (direction) => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("No more profiles");
    }
    console.log(`Swiped ${direction} on ${profiles[currentIndex].name}`);
  };

  if (profiles.length === 0) {
    return <div>Loading...</div>;
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="app">
      <h1>Will Cupidon draw his bow for you ?</h1>
      <div className="profile-container">
        <div className="profile-card">
          <img src={currentProfile.photo} alt={`${currentProfile.name}'s profile`} />
          <h2>{currentProfile.name}, {currentProfile.age}</h2>
          <p>{currentProfile.description}</p>
          <div className="buttons">
            <button className="dislike-button" onClick={() => handleSwipe('left')}>Dislike</button>
            <button className="like-button" onClick={() => handleSwipe('right')}>Like</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;