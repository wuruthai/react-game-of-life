import React, {Component} from 'react';
import './App.css';

const Cell = ({onClick, id, className}) => <div className={className} id={id} onClick={onClick}/>;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(2500).fill("cell"), //class
      intervalId: 0,
      live: "cell cell-live",
      dead: "cell",
      disabled: true,
      generator: {
        turn: 0,
        live: 0,
        dead: 0
      }
    }
    this.onClick = this.onClick.bind(this);
    this.myInterval = this.myInterval.bind(this);
  }
  componentDidMount() {
    let cells = this.state.cells;
    let live = this.state.live;
    let array = [
      1421,
      1422,
      1423,
      1372,
      1472,
      1000,
      1001,
      1002,
      951,
      851,
      556,
      557,
      608,
      657,
      656,
      605,
      200,
      201,
      202,
      202 - 50,
      202 - 50 - 49
    ]

    for (var i = 0; i < array.length; i++) {
      cells[array[i]] = live
    }
    var intervalId = setInterval(this.myInterval, 500)
    this.setState({intervalId: intervalId, cells: cells});
  }
  myInterval() {
    var cells = this.state.cells;
    var live = this.state.live;
    var dead = this.state.dead;
    let copy = this.state.cells.slice();
    let generator = this.state.generator;

    for (let i in cells) {
      var [a, b, c, d, e, f, g, h] = [
        i - 1,
        i - 49,
        i - 50,
        i - 51,
        Number(i) + 1,
        Number(i) + 49,
        Number(i) + 50,
        Number(i) + 51
      ]
      if (a < 0) {
        a = 49;
      }
      if (b < 0) {
        b = 2450 + Number(i) - 1;
      }
      if (c < 0) {
        c = 2450 + Number(i);
      }
      if (d < 0) {
        d = 2450 + Number(i) + 1;
      }
      if (e > 2499) {
        e = 2450;
      }
      if (f > 2499) {
        f = Number(i) - 2450 - 1;
      }
      if (g > 2499) {
        g = Number(i) - 2450;
      }
      if (h > 2499) {
        h = Number(i) - 2450 + 1;
      }
      var neighbor = [
        copy[a],
        copy[b],
        copy[c],
        copy[d],
        copy[e],
        copy[f],
        copy[g],
        copy[h]
      ]

      var num = neighbor.filter((s) => s === live).length;

      if (copy[i] === dead) {

        if (num === 3) {
          cells[i] = live;
          generator.live += 1;
        } else {
          cells[i] = dead;
        }
      }
      if (copy[i] === live) {
        if (num === 2 || num === 3) {
          cells[i] = live;
          generator.live += 1;
        } else {
          cells[i] = dead;
          generator.dead += 1;

        }
      }

    }
    generator.turn += 1;
    this.setState({cells: cells, generator: generator})
  }
  onClick(event) {
    const id = event.target.id;
    const className = event.target.className;
    var cells = this.state.cells;
    var live = this.state.live;
    var dead = this.state.dead;

    if (className === dead) {
      cells[id] = live;
    }
    this.setState({cells: cells});

    if (id === "Start") {

      var intervalId = setInterval(this.myInterval, 500)
      this.setState({intervalId: intervalId, disabled: true});
    }
    if (id === "Stop") {
      clearInterval(this.state.intervalId);
      this.setState({disabled: false});
    }

    if (id === "Clear") {
      clearInterval(this.state.intervalId);
      this.setState({
        cells: Array(2500).fill("cell"), //class
        status: Array(2500).fill(false),
        dead: "cell",
        live: "cell cell-live",
        intervalId: 0,
        disabled: false,
        generator: {
          turn: 0,
          live: 0,
          dead: 0
        }
      });
    }
  }
  render() {
    const Board = this.state.cells.map((cell, i) => {
      return <Cell key={i} id={i} onClick={this.onClick} className={this.state.cells[i]}/>
    })

    return (<div className="flex-container">
      {Board}
      <div className="button-container">
        <div>
          <button id="Start" onClick={this.onClick} disabled={this.state.disabled}>Start</button>
          <button id="Stop" onClick={this.onClick}>Stop</button>
          <button id="Clear" onClick={this.onClick}>Clear</button>
        </div>
        <div id="liveGenerator" style={{
            color: "white",
            fontFamily: "'Ubuntu Condensed', sans-serif"
          }}>Live :
          <input className="generator" type="text" value={this.state.generator.live} size="5" readOnly="readOnly"/></div>
        <div id="deadGenerator" style={{
            color: "white",
            fontFamily: "'Ubuntu Condensed', sans-serif"
          }}>Dead :
          <input className="generator" type="text" value={this.state.generator.dead} size="5" readOnly="readOnly"/></div>
        <div id="turnGenerator" style={{
            color: "white",
            fontFamily: "'Ubuntu Condensed', sans-serif"
          }}>Turn :
          <input className="generator" type="text" value={this.state.generator.turn} size="5" readOnly="readOnly"/></div>
      </div>
    </div>);
  }
}

export default App;
