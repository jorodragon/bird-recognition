const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const data = require('./data.json');
const Promise = require('bluebird');

function toLowerCaseNonAccentVietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

async function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);

  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then((response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
      });
    });
  });
}

async function crawl(url, folder, filename) {
  const response = await axios.get(url);

  const $ = cheerio.load(response.data);

  const audio = $('audio').text();

  if (audio) {
    const dir = `/Volumes/MacDATA/LEARNING/thesis/source-code/crawl-data/data/${folder}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    await downloadFile(audio, `${dir}/${filename}.mp3`);
  }
}

const run = async () => {
  await Promise.map(
    data,
    async ({ name, urls }) => {
      await Promise.map(
        urls,
        async (url, index) => {
          const folder = toLowerCaseNonAccentVietnamese(
            name.trim().toLocaleLowerCase().replace(/ /g, '-'),
          );
          const filename = `${folder}${index}`;

          await crawl(url, folder, filename);

          console.log(url);
        },
        { concurrency: 5 },
      );
    },
    { concurrency: 1 },
  );
  console.log('Done');
};

run();
