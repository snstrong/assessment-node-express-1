const express = require("express");
const axios = require("axios");
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());

app.post("/", async function (req, res, next) {
  // Accepts a JSON request, req, containing an array of GitHub usernames,
  // e.g, {"developers": ["elie", "joelburton"]}
  // Retrieves GitHub data about users in req
  // Returns JSON response, res, containing each user's name and bio as objects in an array
  try {
    let promisedDevs = [];
    for (let dev of req.body.developers) {
      if (!dev) {
        throw new ExpressError("Username is required", 400);
      }
      let devInfo = await axios.get(`https://api.github.com/users/${dev}`);
      promisedDevs.push(devInfo);
    }
    let devs = await Promise.all(promisedDevs);
    let devsResponse = devs.map((dev) => {
      return { name: dev.data.name, bio: dev.data.bio };
    });
    return res.json(devsResponse);
  } catch (err) {
    next(err);
  }
});

/** 404 handler */

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

/** General error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;
