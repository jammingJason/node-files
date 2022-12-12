const fs = require('fs');
const axios = require('axios');
// const { add, subtract } = require('./helper');
// import { add, subtract } from './helper';
const argv = process.argv;
let fileName = argv[argv.length - 1];
let url = argv[argv.length - 1];

if (url.startsWith('http')) {
  getWebsite(url);
} else {
  cat(fileName);
}
// getWebsite(url);

function getWebsite(url) {
  let website = axios
    .get(url)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      console.log('This is your error: ' + err);
    });
  console.log(website);
}

function cat(path) {
  fs.readFile(`./${path}`, 'utf-8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

module.exports = {
  cat: cat,
};
