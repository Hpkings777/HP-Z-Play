import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import GamePlayer from './GamePlayer';
import Library from './Library';
import Profile from './Profile';
import Settings from './Settings';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fullscreen Player Route (No Layout) */}
        <Route path="/play/:id" element={<GamePlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
