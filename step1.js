// const { info } = require('console');
const fs = require('fs');
// const { add, subtract } = require('./helper');
// import { add, subtract } from './helper';
const argv = process.argv;
let fileName = argv[argv.length - 1];
cat(fileName);
// console.log(add(3, 5));
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

// const line = '\nAnother man in another world';
// fs.writeFile('./poem.txt', line, { encoding: 'utf-8', flag: 'a' }, (err) => {
//   if (err) {
//     console.log('ERROR : ', err);
//     process.exit(1);
//   }
//   console.log('IT WORKED');
// });

// fs.appendFile('./poem.txt', line, 'utf-8');
