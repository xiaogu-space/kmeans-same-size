// const KmeansLib = require('kmeans-same-size');
const KmeansLib = require('../util/sameSizeKmeans');

const kmeans = new KmeansLib();
const k = 5; // Groups Number
const size = 200; // Group size

const vectors = [];
for (let i = 0; i < 1000; i += 1) {
  vectors.push({
    id: i,
    x: Math.random() * 10,
    y: Math.random() * 10
  });
}

kmeans.init({
  k,
  runs: size,
  equalSize: true,
  normalize: false
});
const sum = kmeans.calc(vectors);
console.log(vectors);
