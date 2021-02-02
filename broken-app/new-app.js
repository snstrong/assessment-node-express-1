const { default: axios } = require("axios");
const express = require("express");
// const axios = require("axios");

const app = express();

app.use(express.json());

// TODO: improve error handling, document issues and fixes, refactor further?

app.post("/", async function (req, res, next) {
  try {
    let promisedDevs = [];
    for (let dev of req.body.developers) {
      promisedDevs.push(await axios.get(`https://api.github.com/users/${dev}`));
    }
    let devs = await Promise.all(promisedDevs);
    let devsResponse = devs.map((dev) => {
      return { name: dev.data.name, bio: dev.data.bio };
    });
    return res.json(devsResponse);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000);
