const  request = require('request');


request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
    //incoming data will be json take it and convert it to an object.
    json: true 
}, (error, response,body) => {
    let dir = body.results[0].geometry.location;
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${dir.lat}`);
    console.log(`Longitude: ${dir.lng}`);
})