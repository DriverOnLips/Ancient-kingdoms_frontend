import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import KingdomsFeed from './pages/KingdomsFeed/KingdomsFeed';
import KingdomPage from './pages/KingdomPage/KingdomPage';
import NavbarUser from './components/Navbar/Navbar';


const App: React.FC = () => {
  return(
    <BrowserRouter basename="/">
      <NavbarUser />
      <Routes>
        <Route path="/Ancient-kingdoms_frontend/kingdom" element={<KingdomsFeed />} />
        <Route path="/Ancient-kingdoms_frontend/kingdom/:id" element={<KingdomPage />} />         
      </Routes>
    </BrowserRouter>
  )
}

export default App;
