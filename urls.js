const fs = require("fs");
const process = require("process");
const axios = require("axios");

// Function Definitions
//
function getURLs(path) {
  // Reads URLs in from a file, then calls getFromURL to make HTTP request to each URL
  //  Writes HTML to file if request is successful
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    let urlArr = data.split(/\r?\n/);
    for (let url of urlArr) {
      if (url) {
        try {
          getFromURL(url);
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

function getFromURL(url) {
  // Makes HTTP request to given URL using axios
  try {
    axios.get(url).then(function (resp) {
      console.log(`Writing to file: ${resp.request.host}`);
      fs.writeFile(resp.request.host, resp.data, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

// Runtime Function Calls
//
getURLs(process.argv[2]);
