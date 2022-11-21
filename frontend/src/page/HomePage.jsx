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
  const [header, setHeader] = useState({});
  const [birds, setBirds] = useState([]);
  useEffect(() => {
    setHeader(JsonData.header);
    setBirds(JsonData.birds.slice(0, 8));
  }, []);

  return (
    <div>
      <Header data={header} />
      <BirdList data={birds} />
    </div>
  );
};

export default HomePage;
