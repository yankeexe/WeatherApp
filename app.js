const request = require('request');
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
    .alias('help','h') //alias for help
    .argv;

console.log(argv);

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
    //incoming data will be json take it and convert it to an object.
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
})