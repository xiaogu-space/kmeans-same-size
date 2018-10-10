const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
/**
 * @param getTitle:获取excel的第一行名称
 * @param rows:每一行数据，用json数组表示
 * @param filezName:导出文件名
 */
exports.downLoad = async function (getTitle, arrays, fileName, downFloder) {
  const filePath = path.resolve(__dirname, downFloder ? downFloder + fileName : `../downloads/${fileName}`);
  const stream = fs.createWriteStream(filePath);

  // excel打开不是乱码
  stream.write('\ufeff');

  return new Promise((resolve) => {
    stream.on('finish', () => {
      console.log('export-finish');
      return resolve();
    });
    // 生成头部
    const csvStream = csv
    .format({
      headers: true
    })
    .transform(getTitle);
    csvStream.pipe(stream);
    arrays.forEach((row) => {
      csvStream.write(row);
    });
    // 关闭写入
    csvStream.end(() => {
      console.log('end');
    });
  });
};
