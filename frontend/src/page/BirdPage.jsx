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
  const [isShowMore, setIsShowMore] = useState(false);

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const handleClickShowMore = () => {
    
  }

  return <BirdList data={landingPageData.birds} isShowMore={isShowMore} hasShowMore={true} handleClickShowMore={() => {}}/>;
};

export default BirdPage;
