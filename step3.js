const fs = require('fs');
const axios = require('axios');
// const { add, subtract } = require('./helper');
// import { add, subtract } from './helper';
const argv = process.argv;
let fileName = argv[argv.length - 1];
let url = argv[argv.length - 1];
let namedFile = argv[argv.length - 2];
let letMeOut = argv[2];

if (url.startsWith('http')) {
  getWebsite(url, letMeOut);
} else {
  cat(fileName, letMeOut);
}

async function getWebsite(url, out) {
  let website = await axios
    .get(url)
    .then((resp) => {
      console.log(resp.data);
      if (out === '--out') {
        writToFile(namedFile, resp.data);
      }
      return resp.data;
    })
    .catch((err) => {
      console.log('This is your error: ' + err);
    });
  // return website;
}

function writToFile(nameOfFile, content) {
  fs.appendFile(
    `./${nameOfFile}`,
    content,
    { encoding: 'utf-8', flag: 'a' },
    (err) => {
      if (err) {
        console.log('ERROR : ', err);
        process.exit(1);
      }
      console.log('IT WORKED');
    }
  );
}

function cat(path, out) {
  fs.readFile(`./${path}`, 'utf-8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      process.exit(1);
    } else {
      console.log(data);
      if (out === '--out') {
        writToFile(namedFile, data);
      }
      return data;
    }
  });
}
