const fs = require('fs');
const axios = require('axios');
// const { add, subtract } = require('./helper');
// import { add, subtract } from './helper';
const argv = process.argv;
let fileName = argv[argv.length - 1];
let url = argv[argv.length - 1];
let goOut = argv[2];
if (goOut === '--out') {
  if (url.startsWith('http')) {
    contents = getWebsite(url);
  } else {
    contents = cat(fileName);
  }
  writeToFile(argv[3], contents);
  //   console.log('This is what we have!');
} else {
  if (url.startsWith('http')) {
    getWebsite(url);
  } else {
    cat(fileName);
  }
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
  return website;
}

function cat(path) {
  fs.readFile(`./${path}`, 'utf-8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      process.exit(1);
    } else {
      return data;
    }
  });
}
function writeToFile(fileToBeWritten, contents) {
  //   console.log(fileToBeWritten, contents);
  fs.writeFile(
    `./${fileToBeWritten}`,
    contents,
    { encoding: 'utf-8' },
    (err) => {
      if (err) {
        console.log('ERROR : ', err);
        process.exit(1);
      }
      console.log(`# no output, but ${fileToBeWritten} was created.`);
    }
  );
}
module.exports = {
  cat: cat,
};
