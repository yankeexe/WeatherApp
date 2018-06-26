const request = require('request');

let getWeather = (la, lo, callback) => {
    request({
        url: `https://api.darksky.net/forecast/8b56fc292a653b45f75e0291085630d0/${la},${lo}`,
        json: true
    }, (error, resonse, body) => {
        if (error) {
            callback("Unable to connect to the server");
        } else if (body.error === "The given location (or time) is invalid.") {
            callback('Time and Location not found');
        } else {
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature
            })

        }
    })
}

module.exports = {
    getWeather
}