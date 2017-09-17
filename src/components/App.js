import React, { Component } from "react";
// eslint-disable-next-line
import "./App.css";
import Board from "./board/board";
import GameInformation from './gameInformation'
class App extends Component {
  renderRightGuidlines() {
    let items = [];
    for (let i = 1; i <= 8; i++) {
      items.push(<li key={i} className="right-guidelines">{i}</li>);
    }
    return items;
  }

  renderTopGuidlines() {
    let items = [
      <li key={1} className="top-guidelines">A</li>,
      <li key={2} className="top-guidelines">B</li>,
      <li key={3} className="top-guidelines">C</li>,
      <li key={4} className="top-guidelines">D</li>,
      <li key={5} className="top-guidelines">E</li>,
      <li key={6} className="top-guidelines">F</li>,
      <li key={7} className="top-guidelines">G</li>,
      <li key={8} className="top-guidelines">H</li>
    ];

    return items;
  }

  render() {
    return (
      <div className="main-container">
      <GameInformation />
       {/*  <div className="move-details-container" /> */}
        <div className="app-container">
          <div className="top-guidelines-container">
            <ul>
              {this.renderTopGuidlines()}
            </ul>
          </div>
          <Board knightPosition={this.props.knightPosition} />
          <div className="right-guidelines-container ">
            <ul>
              {this.renderRightGuidlines()}
            </ul>
          </div>
        </div>
        
        {/* <div className="move-details-container">
          Move Container
    </div> */}
      </div>
    );
  }
}

export default App;
