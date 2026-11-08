import React, { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";
import Tile from "./components/Tile";
import addNumber from "./helper/addNumber";
import { useEvent } from "./helper/useEvent";
import "./App.css";
import {
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from "./helper/constants";
import { swipeLeft } from "./helper/swipeLeft";
import { swipeRight } from "./helper/swipeRight";
import { swipeUp } from "./helper/swipeUp";
import { swipeDown } from "./helper/swipeDown";
import Footer from "./components/footer";

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  /* Initialize GRID */
  const initialize = () => {
    let newGrid = cloneDeep(data);
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line
  }, []);

  /* Reset GRID */
  const resetGame = () => {
    if (gameScore > localStorage.getItem("bestScore")) {
      localStorage.setItem("bestScore", gameScore);
    }
    setGameScore(0);
    setGameOver(false);
    const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    addNumber(emptyGrid);
    addNumber(emptyGrid);
    setData(emptyGrid);
  };

  const checkIfGameOver = () => {
    if (
      swipeDown(data).checkGameOver &&
      swipeUp(data).checkGameOver &&
      swipeLeft(data).checkGameOver &&
      swipeRight(data).checkGameOver
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleKeyDown = (event) => {
    if (gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        var { newGrid, score } = swipeUp(data, gameScore);
        setGameScore(score);
        setData(newGrid);
        break;
      case DOWN_ARROW:
        var { newGrid, score } = swipeDown(data, gameScore);
        setGameScore(score);
        setData(newGrid);
        break;
      case LEFT_ARROW:
        var { newGrid, score } = swipeLeft(data, gameScore);
        setGameScore(score);
        setData(newGrid);
        break;
      case RIGHT_ARROW:
        var { newGrid, score } = swipeRight(data, gameScore);
        setGameScore(score);
        setData(newGrid);
        break;
      default:
        break;
    }
    if (checkIfGameOver()) {
      setGameOver(true);
    }
  };

  /* CUSTOM HOOK to handle EVENT */
  useEvent("keydown", handleKeyDown);

  return (
    <div className="App">
      <div className="heading">
        <h1 class="title">2048</h1>
        <div class="scores-container">
          <div style={{ marginRight: 5 }} class="score-container">
            {gameScore}
          </div>
          <div class="best-container">
            {localStorage.getItem("bestScore")
              ? localStorage.getItem("bestScore")
              : 0}
          </div>
        </div>
      </div>
      <div class="above-game">
        <div class="game-intro">
          Join the tiles, get to <strong>2048!</strong>
          <br />
        </div>
        <div onClick={resetGame} class="restart-button">
          New Game
        </div>
      </div>
      <div className="border">
        {gameOver && (
          <div className="gameOverOverlay">
            <div>
              <div className="game-over">Game Over</div>
              <div className="tryAgainButton" onClick={resetGame}>
                Try Again
              </div>
            </div>
          </div>
        )}
        <div>
          {data.map((row, rowIndex) => {
            return (
              <div style={{ display: "flex" }} key={rowIndex}>
                {row.map((digit, index) => (
                  <Tile num={digit} key={index} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div class="game-explanation">
        <strong class="important">How to play:</strong> Use your{" "}
        <strong>arrow keys</strong> to move the tiles. Tiles with the same
        number <strong>merge into one</strong> when they touch. Add them up to
        reach <strong>2048!</strong>
      </div>
      <Footer />
    </div>
  );
}

export default App;
