const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: false,
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

    var encodeURI = encodeURIComponent(argv.address) 
    var addr = argv.address ? encodeURI : "kirtipur%20Kathmandu"; //default address
    var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}`;

    axios.get(geocodeURL).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
         throw new Error('Unable to find the address.');
        }
        var la = response.data.results[0].geometry.location.lat;
        var lo = response.data.results[0].geometry.location.lng;
       var weatherURL =  `https://api.darksky.net/forecast/8b56fc292a653b45f75e0291085630d0/${la},${lo}?units=si`
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherURL)
    }).then((response) => {
        var temperature = response.data.currently.temperature;
        var summary = response.data.currently.summary;
        console.log(`Right now the temperature is ${temperature} degree celcius. And the condition is ${summary}.`)
    })
    .catch((e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('Cannot connect to the server');
        }else{
            console.log(e.messsage);
        }
    });




