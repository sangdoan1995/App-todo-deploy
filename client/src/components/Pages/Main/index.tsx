import TradingViewWidget from "../../ChartComponent/index";
import {useEffect, useState} from "react";
import axios from "axios";
import * as constanxx from "constants/constants";

function PageMain() {
  const [prices, setPrices] = useState()
  console.log('aaaa constan', constanxx.API_BASE_URL)
  // useEffect(() => {
  //   const fetchPrices = async () => {
  //     // const {data} = await axios.get(`${constan.API_BASE_URL}/api/prices`);
  //   }
  //   fetchPrices()
  // }, []);
  return (
    <>
      <TradingViewWidget/>
    </>
  );
}

export default PageMain;
