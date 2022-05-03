import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";

//Joke Component
function Joke() {
  //store Joke in state
  const [joke, setJoke] = useState();

  //sets value for button
  const [isOn, setIsOn] = useState(true);

  //gets random joke from API
  const getRandomJoke = () => {
    setIsOn(!isOn); //sets button value
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      })
      .then((res) => {
        setJoke(res.data); //sets Joke
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //loads joke on initial render
  useEffect(() => {
    getRandomJoke();
    setIsOn(!isOn);
  }, []);

  //returns the joke component
  return (
    <>
      <div className="main_container">
        <h3>Hey! Tell me a random Joke!</h3>
        <div className="joke">{joke && isOn && joke.joke}</div>
        <Toggle onClick={getRandomJoke} isOn={isOn} setIsOn={setIsOn} />
      </div>
    </>
  );
}

//button component
function Toggle(props) {
  //loads joke when button is on
  const handleClick = () => {
    if (props.isOn) {
      props.onClick();
    } else {
      props.setIsOn(!props.isOn);
    }
  };

  //return the button component
  return (
    <button className="btn--primary" onClick={handleClick}>
      {props.isOn ? "ON" : "OFF"}
    </button>
  );
}

ReactDOM.render(
  <>
    <Joke />
  </>,
  document.getElementById("root")
);
