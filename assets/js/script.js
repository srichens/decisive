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





    
let headerEl = document.getElementById('page-header');
let titleEl = document.getElementById('page-title');
let tagEl = document.getElementById('tag-line');
let landingPageEl = document.getElementById('landing-page');
let findOutButtonEl = document.getElementById('find-out-btn');
let mindsetEl = document.querySelector('.question-mindset');

findOutButtonEl.addEventListener('click', mindsetPage);

function mindsetPage(event) {
    event.preventDefault();    
    mindsetEl.classList.remove('hidden');
    landingPageEl.classList.add('hidden');
    tagEl.classList.add('hidden');
    titleEl.classList.add('text-white');
    headerEl.classList.replace('bg-blue-300', 'bg-blue-900');
    titleEl.textContent = 'Which best describes your current mindset?';
    titleEl.classList.replace('text-5xl', 'text-3xl');
    titleEl.classList.remove('italic');
    titleEl.classList.add('text-center');
};
