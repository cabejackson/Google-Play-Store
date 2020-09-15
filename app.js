// const debug = require("debug");
const express = require("express");
const morgan = require("morgan");
const gameData = require("./playStore");

const app = express();
app.use(morgan("dev"));

app.get("/apps", (req, res) => {
  const { genres, sort } = req.query;
  let results = [...gameData];

  if (
    genres &&
    genres !== "Action" &&
    genres !== "Puzzle" &&
    genres !== "Strategy" &&
    genres !== "Casual" &&
    genres !== "Arcade" &&
    genres !== "Card"
  ) {
    return res.status(400).json({
      message: `Genre must be one of the following: Action, Arcade, Card, Casual, Puzzle or Stategy`
    });
  }

  if (genres) {
    results = results.filter((app) => app.Genres.includes(genres));
  }

  if (sort && sort !== "Rating" && sort !== "App") {
    return res.status(400).json({
      message: `Sort must be a "rating" or a "app". Also, sort must exist!`
    });
  }
  //sort should equal rating right?
  if (sort) {
    results.sort((currGame, nextGame) => {
      if (currGame[sort] < nextGame[sort]) {
        return +1;
      } else if (currGame[sort] > nextGame[sort]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
