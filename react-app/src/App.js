import React, { useEffect, useState } from "react";
import "./App.css";

const backendHostUrl =
  "https://lugras-jubilant-xylophone-46rq6j79jvvcj546-5001.preview.app.github.dev";

function App() {
  const [temp, setTemp] = useState(0);
  const [lowtemp, setLowTemp] = useState(0);
  const [conditionicon, setConditionIcon] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [maxtemp, setMaxTemp] = useState("");
  const [mintemp, setMinTemp] = useState("");
  const [epotch, setEpotch] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${backendHostUrl}/geeks-firebase-72e6d/us-central1/getDayWeather`
      );

      const data = await res.json();

      console.log("The res: ", data);
      setTemp(data.data.current.temp_f);
      setLowTemp();
      setConditionIcon("http:" + data.data.current.condition.icon);
      setCondition(data.data.current.condition.text);
      setLocation(data.data.location.name);
      setRegion(data.data.location.region);
      setMaxTemp(data.data.forecast.forecastday[0].day.maxtemp_f);
      setMinTemp(data.data.forecast.forecastday[0].day.mintemp_f);
      setEpotch(data.data.current.condition.last_updated_epoch);
      setEpotch1H(data.data.forecast.forecastday[0].hour[0].temp_f);
    })();
  }, []);

  return (
    <div className="appWeather">
      <h1>The Weather Today</h1>
      <div className="tempF">
        <h3 className="maintemp">{temp} °F</h3>
      </div>
      <div>
        <img src={conditionicon} />
      </div>
      <div>
        <h1>{condition}</h1>
      </div>
      <div>
      <h3>{location},{region}</h3>
      </div>
      <div>
      <h3>Max Temperature  {maxtemp} °F</h3>
        </div>
        <div>
      <h3>Min Temperature  {mintemp} °F</h3>
        </div>
        <div>
          <div className="tableweather">
        
              <div>
                <b>Previous Hour</b>
              </div>
              <div className="currenttemp">
              <b>Current Hour</b>
              {epotch}
              </div>
              <div>
              <b>Next Hour</b>
              </div>

          </div>
        </div>
    </div>
  );
}

export default App;
