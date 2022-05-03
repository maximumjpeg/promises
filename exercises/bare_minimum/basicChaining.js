/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('needle');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, 'utf8', (err, name) => {
      if (err) {
        reject(err);
      } else {
        resolve(name.split('\n', 1)[0]);
      }
    });
  })
    .then(function(name) {
      return new Promise((resolve, reject) => {
        request.get('https://api.github.com/users/' + name, (err, response, body) => {
          if (err) {
            reject(err);
          } else {
            resolve(body);
          }
        });
      });
    })
    .then(function(body) {
      return new Promise((resolve, reject) => {
        fs.writeFile(writeFilePath, JSON.stringify(body), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('');
          }
        });
      });
    })
    .catch(err => {throw (err);});
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
