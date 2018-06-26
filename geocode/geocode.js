//encode the address given by user.
// var eAddr = encodeURIComponent(argv.a);

let request =  require('request');
var geocodeAddress = (eAddr,callback)=> {
    /**app runs without encoding the address 
     * but still for stability encoding is added
    */
    var encodeURI = encodeURIComponent(eAddr);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${eAddr}`,
        //incoming data will be json - take it and convert it to an object.
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to the Google Servers')
        } else if (body.status === "ZERO_RESULTS") {
            callback("Unable to find that address");
        } else if (body.status === "OK") {
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });

}
module.exports = {
    geocodeAddress
}
