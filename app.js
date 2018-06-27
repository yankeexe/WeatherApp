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
        },
        u:{
            alias: 'units',
            describe: 'Desired unit of Weather Info, more on Readme.md',
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
        console.log("Address:",results.address);
        weather.getWeather(results.latitude, results.longitude, argv.u, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`Weather Forecast: It is currently ${weatherResults.summary}. And the temperature is ${weatherResults.temperature} degree celcius. The Cloud Cover is ${weatherResults.cloudCover}`)
            }
        });
    }
});



