const fetch = require('node-fetch');
const {appId} = require('./config');

// fetch(`http://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=${appId}`)
//     .then(data=>data.json())
//     .then(result=>{
//         console.log(result);
//     });


module.exports = async function(city = 'Kiev') {
    try {
        const result = await (await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`)).json();
        if (result.cod !== 200) {
            throw new Error(result.message);
        }
        return `Weather in ${city}: ${result.weather[0].main}, ${(result.main.temp - 273).toFixed(2)}C`
    } catch(err) {
        return err.message;
    }
};
