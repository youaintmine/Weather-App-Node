const request = require('request')

const forecast = (lat, long, callback) => {
    // console.log(lat, long)
    const url = 'http://api.weatherstack.com/current?access_key=8b25410f06e2fb72aeb407d4b2b6ed76&query=' + lat +',' + long


    request( {url , json : true}, (error, {body}) => {
        if(error){
            callback('Unable to fetch, the data', undefined)
        } else if (body.error) {
            callback(body.error.code + " : " + body.error.info, undefined)
        } else {
            callback(undefined, {
                temperature : body.current.temperature,
                feellike : body.current.feelslike,
                desc : body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast
