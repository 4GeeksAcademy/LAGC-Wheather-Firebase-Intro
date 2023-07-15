import React, { useEffect, useState } from "react";
import "./App.css";

const backendHostUrl = 'https://lugras-jubilant-xylophone-46rq6j79jvvcj546-5001.preview.app.github.dev';

function App() {

   const [temp, setTemp] = useState(0);
   const [lowtemp, setLowTemp] = useState(0);
   const [condition, setCondition] = useState("");
   const [conditionicon, setConditionIcon] = useState("");
  // const [address, setAddress] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${backendHostUrl}/geeks-firebase-72e6d/us-central1/getDayWeather`
      );

      const data = await res.json();
      
      console.log("The res: ", data);
      setTemp(data.data.current.temp_f);
      setLowTemp();
      setCondition(data.data.current.condition.text);
      setConditionIcon(data.data.current.condition.icon);
    })();
  }, []);
  
  
  return (
      <div className="appWeather">
        <h1>The Weather Today</h1>
        <div>
             <h3>{temp}</h3>
{conditionicon}<h1>{condition}</h1>
        </div>
      </div>
    );
  }

  export default App;