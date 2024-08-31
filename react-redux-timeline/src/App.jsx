import React from 'react';
import Timeline from './components/Timeline';
import "./App.css"
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <h1>Post Timeline</h1>
      <Navbar />
      <Timeline />
    </div>
  );
}

export default App;
