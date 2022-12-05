import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const URL = "http://localhost:9000/api/result";
let x = 0;
let y = 0;
let success = '';

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  error: '',
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor(props) {
    super(props);
    this.state = initialState
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    
    if (this.state.index < 3) {
      x = this.state.index + 1;
      y = 1;
      return `(${x}, ${y})`;
      
    }
    if (this.state.index >= 3 && this.state.index < 6) {
      x = this.state.index - 2;
      y = 2;
      return `(${x}, ${y})`;
    }
    else if (this.state.index >= 6) {
      x = this.state.index - 5;
      y = 3;
      return `(${x}, ${y})`;
    }
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const coordinates  = this.getXY();
    return coordinates;
  }
  

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState);
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === "left" && this.state.index < 3 && this.state.index > 0) {
      this.setState({...this.state, index: this.state.index - 1, steps: this.state.steps + 1, message: "" })
    }
    else if (direction === "left" && this.state.index < 6 && this.state.index > 3) {
      this.setState({...this.state, index: this.state.index - 1, steps: this.state.steps + 1, message: "" })
    }
    else if (direction === "left" && this.state.index > 6) {
      this.setState({...this.state, index: this.state.index - 1, steps: this.state.steps + 1, message: "" })
    }
    else if (direction === "left" && this.state.index <= 0) {
      this.setState({...this.state, message: "You can't go left"})
    }
    else if (direction === "left" && this.state.index === 3) {
      this.setState({...this.state, message: "You can't go left"})
    }
    else if (direction === "left" && this.state.index === 6) {
      this.setState({...this.state, message: "You can't go left"})
    }
    else if (direction === "right" && this.state.index < 8 && this.state.index > 5) {
      this.setState({...this.state, index: this.state.index + 1, steps: this.state.steps + 1, message: "" })
    }
    else if (direction === "right" && this.state.index < 5 && this.state.index > 2) {
      this.setState({...this.state, index: this.state.index + 1, steps: this.state.steps + 1, message: "" })
    }
    else if (direction === "right" && this.state.index < 2) {
      this.setState({...this.state, index: this.state.index + 1, steps: this.state.steps + 1, message: "" })
    }
    else if (direction === "right" && this.state.index >= 8) {
      this.setState({...this.state, message: "You can't go right"})
    }
    else if (direction === "right" && this.state.index === 5) {
      this.setState({...this.state, message: "You can't go right"})
    }
    else if (direction === "right" && this.state.index === 2) {
      this.setState({...this.state, message: "You can't go right"})
    }
    else if (direction === "up" && this.state.index > 2) {
      this.setState({...this.state, index: this.state.index - 3, steps: this.state.steps + 1, message: "" })
    }
    else if (direction === "up" && this.state.index <= 2) {
      this.setState({...this.state, message: "You can't go up"})
    }
    else if (direction === "down" && this.state.index < 6 ) {
      this.setState({...this.state, index: this.state.index + 3, steps: this.state.steps + 1, message: "" })
    }
    else if (direction === "down" && this.state.index >= 6 ) {
      this.setState({...this.state, message: "You can't go down"})
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    // console.log(this.state.index);
    this.getNextIndex(evt.target.id);
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    evt.preventDefault();
    this.setState({...this.state, email: evt.target.value});
  }

  onSubmit = (evt) => {
  // Use a POST request to send a payload to the server.
  //- The endpoint expects a payload like `{ "x": 1, "y": 2, "steps": 3, "email": "lady@gaga.com" }`:
  // - `x` should be an integer between 1 and 3.
  // - `y` should be an integer between 1 and 3.
  // - `steps` should be an integer larger than 0.
  // - `email` should be a valid email address.
    evt.preventDefault();
    // this.getXY();
    axios.post(URL, { x: x, y: y, steps: this.state.steps, email: this.state.email })
    .then((res) => {
      console.log(res.data);
      success = res.data.message;
      this.setState({...this.state, email: initialEmail});
    })

    .catch((err) => {
      console.log(err);
      this.setState({...this.state, error: err.response.data.message})
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXYMessage()}</h3>
          <h3 id="steps">{this.state.steps === 1 ? `You moved ${this.state.steps} time` : `You moved ${this.state.steps} times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
          <h3 id="error-message">{this.state.error || success}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
