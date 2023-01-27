//js goes here
const apiKey = '2b53fe9e9a97281c32a772fc33b1d0b7';
const city ='Atlanta'

const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2b53fe9e9a97281c32a772fc33b1d0b7`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const latitude = data.city.coord.lat;
        console.log(latitude);
        const longitude= data.city.coord.lon;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                const main = data.weather[0].main;
                const description = data.weather[0].description;
                let message = '';
                if (main === 'Clear') {
                    message = 'The weather is clear.';
                } else if (main === 'Rain') {
                    message = 'There is a chance of rain.';
                } else if (main === 'Snow') {
                    message = 'There is a chance of snow.';
                } else if (main === 'Thunderstorm') {
                    message = 'There is a chance of thunderstorm.';
                } else if (main === 'Windy') {
                    message = 'It is windy.';
                } else if (description === 'tornado') {
                    message = 'There is a chance of tornado.';
                } else {
                    message = `The weather is ${description}.`;
                }
                console.log(message);
            })
            .catch(error => console.error(error));
        


    })
    .catch(error => console.error(error));





    
