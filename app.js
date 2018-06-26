const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Adress to fetch weather.',
            string: true
        }
    })
    .help()
    .alias('help', 'h') //alias for help
    .argv; //pass all of this info to argv itself.

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It is currently ${weatherResults.summary}. And the temperature is ${weatherResults.temperature}.`)
            }
        });
    }
});



