import { useEffect, useState } from 'react';
import SmoothScroll from 'smooth-scroll';
import '../App.css';
import { Header } from '../components/header';
import { BirdList } from '../components/BirdList';
import JsonData from '../data/data.json';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const HomePage = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Header data={landingPageData.Header} />
      <BirdList data={landingPageData.Team} />
    </div>
  );
};

export default HomePage;
