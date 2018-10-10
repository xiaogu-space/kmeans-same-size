const KmeansLib = require('kmeans-same-size');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const exportCsv = require('../util/exportCsv');

const kmeans = new KmeansLib();

const pathCsv = '../data/人口数据-1-level.csv';
const k = 15; // Groups Number
const size = 113; // Group size

const vectors = [];
const filePath = path.resolve(__dirname, pathCsv);
const stream = fs.createReadStream(filePath);
csv
.fromStream(stream, {
  headers: true
})
.on('data', (data) => {
  vectors.push({
    ORGID: data.ORGID,
    x: parseFloat(data.Longitude),
    y: parseFloat(data.Latitude)
  });
})
.on('end', async () => {
  kmeans.init({
    k,
    runs: size,
    equalSize: true,
    normalize: false
  });
  console.log('规划');
  const sum = kmeans.calc(vectors);
  console.log(vectors);
  await exportCsv.downLoad((row) => {
    const firstObj = vectors[0];
    const titleObj = {};
    for (const str in firstObj) {
      titleObj[str] = row[str];
    }
    return titleObj;
  }, vectors, '分区.csv', '../data/');
});
