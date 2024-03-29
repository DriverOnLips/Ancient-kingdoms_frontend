import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import KingdomsFeed from './pages/KingdomsFeed/KingdomsFeed';
import KingdomPage from './pages/KingdomPage/KingdomPage';
import NavbarUser from './components/Navbar/Navbar';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ApplicationFeed from './pages/ApplicationsFeed/ApplicationsFeed';
import ApplicationPage from './pages/ApplicationPage/ApplicationPage';
import Loader from './components/UI/Loader/Loader';
import ModeratorApplicationFeed from './pages/ModeratorApplicationsFeed/ModaratorApplicationFeed';
import ModeratorKingdomsFeed from './pages/ModeratorKingdomsFeed/ModeratorKingdomsFeed';
import ModeratorAddAndEditKingdom from './pages/ModeratorAddAndEditKingdom/ModeratorAddAndEditKingdom';


const App: React.FC = () => {
  const { isModerator, checkLogin } = useAuth();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { 
    checkLogin()
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(true))
  }, []);

  if (!isLoaded) {
    return <Loader />
  }

  return(
    <BrowserRouter basename="/">
      <NavbarUser />
      <Routes>
        <Route path="/kingdom" element={<KingdomsFeed />} />
        <Route path="/kingdom/:id" element={<KingdomPage />} />      
        <Route path="/application" element={<ApplicationFeed />} />
        <Route path="/application/:id" element={<ApplicationPage />} />              
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/application_moderator" element={<ModeratorApplicationFeed />} />
        <Route path="/kingdom_moderator" element={<ModeratorKingdomsFeed />} />
        <Route path="/kingdom_add/" element={<ModeratorAddAndEditKingdom add={true} />} />      
        <Route path="/kingdom_edit/:id" element={<ModeratorAddAndEditKingdom add={false} />} />      
      </Routes>
    </BrowserRouter>
  )
}

export default App;
