const request = require('postman-request');

// Second HTTP request - Weather API
function getForecast(latitude, longitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=167e8c8cdf7f7728e43813127f320f93&query=${latitude},${longitude}`;
    
    const options = {
        url,
        json: true
    };

    request(options, (error, { body:response }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
            // console.error(chalk.bgRed('Unable to connect to weather service.'));
        } else if (response.error) {
            const error = response.error;
            callback(`(Error ${error.code}) ${error.info}`, undefined);
            // console.error(chalk.bgRed(`(Error ${error.code}) ${error.info}`));
        } else {
            const data = response.current;
            callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`)
            // console.log(`${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`)
        }
    });
}


module.exports = getForecast;