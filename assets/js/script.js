let headerEl = document.getElementById('page-header');
let titleEl = document.getElementById('page-title');
let tagEl = document.getElementById('tag-line');
let landingPageEl = document.getElementById('landing-page');
let findOutButtonEl = document.getElementById('find-out-btn');
let mindsetEl = document.querySelector('.question-mindset');
let insecureEl = document.getElementById('insecure');
let guiltEl = document.getElementById('guilt');
let defiantEl = document.getElementById('defiant');
let introvertedEl = document.getElementById('introverted');
let locationQuesEl = document.getElementById('location-question');
let locationNextEl = document.getElementById('location-next');
let destinationQuesEl = document.getElementById('destination-question');
let destinationNextEl = document.getElementById('destination-next');
let timeQuesEl = document.getElementById('time-question');
let arriveButtonEl = document.getElementById('arrive-btn');
let answerEl = document.getElementById('answer');
let whyButtonEl = document.getElementById('why-btn');
let dataAnalysisEl = document.getElementById('data-analysis');
let dataTextEl = document.getElementById('data-text');
let refreshButtonEl = document.getElementById('refresh-btn');
let locationSubmitEl = document.getElementById('location-submit');
let localInputEl = document.getElementById('loc-input');
let localFormEl = document.getElementById('loc-form');
let localWeatherEl = document.querySelector('.location-weather');
let locErrorEl = document.getElementById('eml');
let destErrorEl = document.getElementById('emd');
let destRenderEl = document.querySelector('.destination');


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

insecureEl.addEventListener('click', locationPage);
guiltEl.addEventListener('click', locationPage);
defiantEl.addEventListener('click', locationPage);
introvertedEl.addEventListener('click', intrDataPage);

function locationPage(event) {
    event.preventDefault();  
    mindsetEl.classList.add('hidden');
    locationQuesEl.classList.remove('hidden');
    titleEl.textContent = 'What is your current location?';
}

function intrDataPage(event) {
    event.preventDefault();    
    mindsetEl.classList.add('hidden');
    dataAnalysisEl.classList.remove('hidden');
    titleEl.textContent = 'Data Analysis';
    dataTextEl.textContent = "That's cool. You should stay in."
}

locationNextEl.addEventListener('click', destinationPage);

function destinationPage(event) {
    event.preventDefault();      
    locationQuesEl.classList.add('hidden');
    destinationQuesEl.classList.remove('hidden');
    titleEl.textContent = 'Where are you planning on going/supposed to go?';
}

destinationNextEl.addEventListener('click', arriveTimePage);

function arriveTimePage(event) {
    event.preventDefault();     
    destinationQuesEl.classList.add('hidden');
    timeQuesEl.classList.remove('hidden');
    titleEl.textContent = 'What time do you need to be there?';
}

arriveButtonEl.addEventListener('click', answerPage);

function answerPage(event) {
    event.preventDefault();        
    timeQuesEl.classList.add('hidden');
    answerEl.classList.remove('hidden');
    titleEl.classList.replace('text-3xl', 'text-5xl');
    titleEl.textContent = 'Should I go out?';
}

whyButtonEl.addEventListener('click', dataPage);

function dataPage(event) {
    event.preventDefault();     
    answerEl.classList.add('hidden');
    dataAnalysisEl.classList.remove('hidden');
    titleEl.classList.remove('text-center');
    titleEl.textContent = 'Data Analysis';
    titleEl.classList.replace('text-5xl', 'text-3xl');   
}

refreshButtonEl.addEventListener('click', function() {
    location.reload();
});


localFormEl.addEventListener('submit', fetchWeather);

const apiKey = '2b53fe9e9a97281c32a772fc33b1d0b7';
let city;

function fetchWeather(event){
    event.preventDefault();
    console.log("This button is working ");    

    city = localInputEl.value.trim();          
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
    .then(response => response.json())
        .then(data => {           
            console.log(data);            
            localWeatherEl.classList.remove('hidden');
            const latitude = data.coord.lat;
            console.log(latitude);
            const longitude= data.coord.lon;
            console.log(longitude);
            const description = data.weather[0].description;
            let location = document.querySelector('.current-location');
            location.textContent = city;
            let message = document.querySelector('.current-weather');
            message.textContent = `Current Weather Condition: ${description}.`;     
            fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32); 
            document.getElementById('current-temp').innerHTML = "Temp: " + fahrenheit + '\u00B0' + ' F';  
            locErrorEl.innerHTML = "";             
        })   
   .catch(error => localWeatherEl.classList.add('hidden'), locErrorEl.innerHTML = "Please enter a valid location");
    localInputEl.value = "";   
};
    





    
