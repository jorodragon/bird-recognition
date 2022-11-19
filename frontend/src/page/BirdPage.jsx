import { useEffect, useState } from "react";
import SmoothScroll from "smooth-scroll";
import "../App.css";
import { BirdList } from "../components/BirdList";
import JsonData from "../data/data.json";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const BirdPage = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return <BirdList data={landingPageData.Team} hasShowMore={true} />;
};

export default BirdPage;
