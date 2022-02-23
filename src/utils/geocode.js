const request = require('postman-request');

// First HTTP request - Geocoding API
function getCoordonates(location, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiaXZhbmhvOTIiLCJhIjoiY2t6cHd0eXQ2NTFnNTJvbzExb3RkMW5ueiJ9.iKW-mSl7-J2xYhe63fZkGA&limit=1`;
    
    const options = {
        url,
        json: true
    };

    request(options, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocoding service.', undefined);
            // console.error(chalk.bgRed('Unable to connect to geocoding service.'));
        } else if (body.features.length === 0) {
            callback('Location not found. Please try another location.', undefined);
            // console.error(chalk.bgRed(`Location not found. Please try another location.`));
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
            // const latitude = response.body.features[0].center[1];
            // const longitude = response.body.features[0].center[0];
            // callback(latitude, longitude);
        }
    });
}

module.exports = getCoordonates;