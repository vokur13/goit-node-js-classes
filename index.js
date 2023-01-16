// const { getCurrentDate } = require('./dateUtils');
// globalThis.testData = 'GlobalTestVariable - AAA';
// console.log(`get current date function result: ${getCurrentDate()}`);

// console.log('Hello Node');
// console.log(globalThis.testData);
// console.log(process.env);
// console.log(process.argv);
// process.exit();
// console.log('object');

// console.log(__dirname);
// console.log(__filename);

// import { Calc } from 'calc-js';

// console.log(process.argv);

// const [, , a, b] = process.argv;
// const a = process.argv[2];
// const b = process.argv[3];

// console.log(new Calc(parseInt(a)).sum(parseInt(b)).finish());

// import path from 'path';
// const path = require('path');

// console.log(path.resolve('dateUtils.js'));

const path = require('path');
const fs = require('fs').promises;

// fs.readFile(path.resolve('./data.txt'), 'utf8', (error, data) => {
//   if (error) {
//     console.log(error);
//   }
//   console.log(data);
// });

// Синхронный аналог функции (Не рекомендуется использовать)

// const data = fs.readFileSync(path.resolve('./data.txt'), 'utf8');
// console.log(data);

// Вариант с Promises

// fs.readFile(path.resolve('./data.txt'), 'utf8')
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.log(error.message));

console.log('qwer1234');

(async () => {
  try {
    const data = await fs.readFile(path.resolve('./package.json'), 'utf8');
    console.log(JSON.parse(data).dependencies);

    // const newContent = `${data} school`;
    // await fs.writeFile(path.resolve('./data1.txt'), newContent, 'utf8');

    // await fs.rename(
    //   './dateUtilsNewName.js',
    //   './sampleFolder/dateUtilsNewName.js'
    // );

    // console.log(await fs.readdir('./sampleFolder'));

    // await fs.unlink('./sampleFolder/dateUtilsNewName.js');

    await fs.appendFile('.data1.txt', 'lecture', 'utf8');
  } catch (error) {
    console.log(error.message);
  }
})();
