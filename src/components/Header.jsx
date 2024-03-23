import React from "react";
import logo from "/logo.png";
import convertSeconds from "../utils/convertTime";

function Header({
  currentScore,
  bestScore,
  currentDifficulty,
  playTime,
  isStart,
}) {
  const difficulty =
    currentDifficulty[0].toUpperCase() + currentDifficulty.slice(1);
  return (
    <header className="header">
      <h2>
        <img src={logo} alt="MemoryGame" width={"50px"} /> Memory Card
      </h2>

      {!isStart && (
        <div className="status-bar">
          <section>Time: {convertSeconds(playTime)}</section>
          <section>Difficuty: {difficulty}</section>
          <section>Current score: {currentScore}</section>
          <section>Best score: {bestScore}</section>
        </div>
      )}
    </header>
  );
}

export default Header;
