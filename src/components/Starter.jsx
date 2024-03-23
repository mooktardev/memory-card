import React from "react";

function StartCard({
  currentDifficulty,
  startBtnHandler,
  handleDifficulty,
  message,
  giphyURL
}) {

  return (
    <section className="start-screen">
      <h1>{message}</h1>

      <div className="giphy">
        <img src={giphyURL} alt="giphy" />
      </div>

      <div className="radio-inputs">
        <label className="radio" htmlFor="difficulty-easy">
          <input
            type="radio"
            name="difficulty"
            value="easy"
            id="difficulty-easy"
            checked={currentDifficulty === "easy"}
            onChange={handleDifficulty}
          />
          <span className="name">Easy</span>
        </label>
        <label className="radio" htmlFor="difficulty-medium">
          <input
            type="radio"
            name="difficulty"
            value="medium"
            id="difficulty-medium"
            checked={currentDifficulty === "medium"}
            onChange={handleDifficulty}
          />
          <span className="name">Medium</span>
        </label>

        <label className="radio" htmlFor="difficulty-hard">
          <input
            type="radio"
            name="difficulty"
            value="hard"
            id="difficulty-hard"
            checked={currentDifficulty === "hard"}
            onChange={handleDifficulty}
          />
          <span className="name">Hard</span>
        </label>
      </div>

      <button className="btn" onClick={startBtnHandler}>
        Start
      </button>

      <p>
        <em>pick all cards one by one without repeating.</em>
      </p>
    </section>
  );
}

export default StartCard;
