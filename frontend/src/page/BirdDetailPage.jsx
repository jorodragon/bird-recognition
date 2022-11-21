import { useEffect, useState } from 'react';
import SmoothScroll from 'smooth-scroll';
import '../App.css';
import { BirdDetail } from '../components/BirdDetail';
import JsonData from '../data/data.json';
import { useParams } from 'react-router-dom';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const BirdDetailPage = () => {
  const params = useParams();

  const [bird, setBird] = useState(null);

  useEffect(() => {
    const { id = 0 } = params;
    if (JsonData.birds.length > id) setBird(JsonData.birds[id]);
  }, []);

  if (bird) return <BirdDetail data={bird} />;

  return <></>;
};

export default BirdDetailPage;
