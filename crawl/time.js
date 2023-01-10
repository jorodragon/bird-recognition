const fs = require('fs');
const path = require('path');
const getMP3Duration = require('get-mp3-duration');

const dataPath = './data';

function msToHMS(ms) {
  let seconds = ms / 1000;
  const hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;
  const minutes = parseInt(seconds / 60);

  seconds = seconds % 60;
  return hours + ':' + minutes + ':' + seconds;
}

const timespan = 2568370873;
msToHMS(timespan);

function run() {
  try {
    const folders = fs
      .readdirSync(dataPath)
      .filter(
        (subFolder) =>
          fs.existsSync(`./${path.join(dataPath, subFolder)}`) &&
          subFolder != '.DS_Store',
      );

    let totalDuration = 0;
    let totalSample = 0;

    const durations = folders.map((folder) => {
      let classDuration = 0;

      fs.readdirSync(`./${path.join(dataPath, folder)}`).map((file) => {
        const buffer = fs.readFileSync(
          `./${path.join(dataPath, `${folder}/${file}`)}`,
        );
        classDuration += getMP3Duration(buffer);
        totalSample += 1;
      });

      totalDuration += classDuration;

      return { name: folder, duration: classDuration };
    });

    const percentages = durations.map((d) => ({
      name: d.name,
      percentage: ((d.duration / totalDuration) * 100).toFixed(2),
    }));

    console.log(msToHMS(totalDuration));

    fs.writeFileSync('./durations.json', JSON.stringify(durations));
    fs.writeFileSync('./percentages.json', JSON.stringify(percentages));
  } catch (err) {
    console.error(err);
  }
}

run();
