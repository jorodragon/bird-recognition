const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

const baseUrl = 'https://tiengdong.com/tieng-dong-vat/page';

const urls = [];

async function crawl(url) {
  const response = await axios.get(url);

  const $ = cheerio.load(response.data);

  $('#content > ul > li > a').each(function (i, e) {
    if ($(e).attr('href'))
      urls.push({
        name: $(e).text().trim(),
        url: $(e).attr('href'),
      });
  });
}

const run = async () => {
  for (let i = 1; i <= 16; i++) await crawl(`${baseUrl}/${i}`);

  fs.writeFileSync('./full-urls.json', JSON.stringify(urls));

  console.log('Done');
};

run();
