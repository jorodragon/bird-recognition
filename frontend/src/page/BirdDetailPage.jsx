import { useEffect, useState } from 'react';
import SmoothScroll from 'smooth-scroll';
import '../App.css';
import { BirdDetail } from '../components/BirdDetail';
import JsonData from '../data/data.json';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const BirdDetailPage = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
      <BirdDetail data={landingPageData.About} />
  );
};

export default BirdDetailPage;
