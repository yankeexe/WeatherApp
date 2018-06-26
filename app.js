const geocode = require('./geocode/geocode');
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
    .argv; //pass all of this info to argv itself.

geocode.geocodeAddress(argv.a,(errorMessage, results) => {
    if (errorMessage){
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results,undefined,2));
    }

});