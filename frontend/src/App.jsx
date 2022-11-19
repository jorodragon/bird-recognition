import { useState, useEffect } from 'react';
import { Navigation } from './components/navigation';
import { Header } from './components/header';
import { Team } from './components/BirdList';
import JsonData from './data/data.json';
import SmoothScroll from 'smooth-scroll';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './page/HomePage';
import BirdPage from './page/BirdPage';
import BirdDetailPage from './page/BirdDetailPage';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <>
    <BrowserRouter>
    <Navigation />
    <Routes>
      <Route exact path="/" element={<HomePage />}>
      
        {/* <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} /> */}
      </Route>
      <Route exact path="/explore" element={<BirdPage />} />
      <Route exact path="/detail" element={<BirdDetailPage />} />
    </Routes>
  </BrowserRouter>
  </>
  );
};

export default App;
