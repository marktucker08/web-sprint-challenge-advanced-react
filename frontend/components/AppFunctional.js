import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const URL = "http://localhost:9000/api/result";
let x = 0;
let y = 0;

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // function getXY() {
  //   // It it not necessary to have a state to track the coordinates.
  //   // It's enough to know what index the "B" is at, to be able to calculate them.
  //   if (data.index < 3) {
  //     x = data.index + 1;
  //     y = 1;
  //     return (x, y);
  //   }
  //   if (data.index >= 3 && data.index < 6) {
  //     x = data.index - 2;
  //     y = 2;
  //     return (x, y);
  //   }
  //   if (data.index >= 6) {
  //     x = data.index - 5;
  //     y = 3;
  //     return (x, y);
  //   }
  // }

  function getX() {
    if (data.index < 3) {
      x = data.index + 1;
      return x;
    }
    if (data.index >= 3 && data.index < 6) {
      x = data.index - 2;
      return x;
    }
    if (data.index >= 6) {
      x = data.index - 5;
      return x;
    }
  }
  function getY() {
    if (data.index < 3) {
      y = 1;
      return y;
      
    }
    if (data.index >= 3 && data.index < 6) {
      y = 2;
      return y;
    }
    if (data.index >= 6) {
      y = 3;
      return y;
    }
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    // const [coordinatesX, coordinatesY] = getXY();
    const coordinatesX  = getX();
    const coordinatesY  = getY();
    return `Coordinates (${coordinatesX}, ${coordinatesY})`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setData(initialState);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === "left" && data.index < 3 && data.index > 0) {
      setData({...data, index: data.index - 1, steps: data.steps + 1, message: "" })
    }
    else if (direction === "left" && data.index < 6 && data.index > 3) {
      setData({...data, index: data.index - 1, steps: data.steps + 1, message: "" })
    }
    else if (direction === "left" && data.index > 6) {
      setData({...data, index: data.index - 1, steps: data.steps + 1, message: "" })
    }
    else if (direction === "left" && data.index <= 0) {
      setData({...data, message: "You can't go left"})
    }
    else if (direction === "left" && data.index === 3) {
      setData({...data, message: "You can't go left"})
    }
    else if (direction === "left" && data.index === 6) {
      setData({...data, message: "You can't go left"})
    }
    else if (direction === "right" && data.index < 8 && data.index > 5) {
      setData({...data, index: data.index + 1, steps: data.steps + 1, message: "" })
    }
    else if (direction === "right" && data.index < 5 && data.index > 2) {
      setData({...data, index: data.index + 1, steps: data.steps + 1, message: "" })
    }
    else if (direction === "right" && data.index < 2) {
      setData({...data, index: data.index + 1, steps: data.steps + 1, message: "" })
    }
    else if (direction === "right" && data.index >= 8) {
      setData({...data, message: "You can't go right"})
    }
    else if (direction === "right" && data.index === 5) {
      setData({...data, message: "You can't go right"})
    }
    else if (direction === "right" && data.index === 2) {
      setData({...data, message: "You can't go right"})
    }
    else if (direction === "up" && data.index > 2) {
      setData({...data, index: data.index - 3, steps: data.steps + 1, message: "" })
    }
    else if (direction === "up" && data.index <= 2) {
      setData({...data, message: "You can't go up"})
    }
    else if (direction === "down" && data.index < 6 ) {
      setData({...data, index: data.index + 3, steps: data.steps + 1, message: "" })
    }
    else if (direction === "down" && data.index >= 6 ) {
      setData({...data, message: "You can't go down"})
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    // console.log(data.index);
    getNextIndex(evt.target.id);
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    evt.preventDefault();
    setData({...data, email: evt.target.value});
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();

      axios.post(URL, { x: x, y: y, steps: data.steps, email: data.email })
        .then((res) => {
          console.log(res.data);
          setSuccess(res.data.message);
          setData({...data, email: initialEmail});
          setError("");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setError(err.response.data.message);
        })
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{data.steps === 1 ? `You moved ${data.steps} time` : `You moved ${data.steps} times`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === data.index ? ' active' : ''}`}>
              {idx === data.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{data.message}</h3>
        <h3 id="error-message">{error || success}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={data.email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
