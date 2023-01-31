let headerEl = document.getElementById("page-header");
let titleEl = document.getElementById("page-title");
let tagEl = document.getElementById("tag-line");
let landingPageEl = document.getElementById("landing-page");
let findOutButtonEl = document.getElementById("find-out-btn");
let mindsetEl = document.querySelector(".question-mindset");
let insecureEl = document.getElementById("insecure");
let guiltEl = document.getElementById("guilt");
let defiantEl = document.getElementById("defiant");
let introvertedEl = document.getElementById("introverted");
let locationQuesEl = document.getElementById("location-question");
let locationNextEl = document.getElementById("location-next");
let destinationQuesEl = document.getElementById("destination-question");
let destinationNextEl = document.getElementById("destination-next");
let timeQuesEl = document.getElementById("time-question");
let arriveButtonEl = document.getElementById("arrive-btn");
let answerEl = document.getElementById("answer");
let whyButtonEl = document.getElementById("why-btn");
let dataAnalysisEl = document.getElementById("data-analysis");
let dataTextEl = document.getElementById("data-text");
let refreshButtonEl = document.getElementById("refresh-btn");
let locationSubmitEl = document.getElementById("location-submit");
let localInputEl = document.getElementById("loc-input");
let localFormEl = document.getElementById("loc-form");
let localWeatherEl = document.querySelector(".location-weather");
let locErrorEl = document.getElementById("eml");
let destErrorEl = document.getElementById("emd");
let destRenderEl = document.querySelector(".destination");

let destination;
let destRetrievedEl = document.getElementById("destination-retrieved");
let destInputEl = document.getElementById("dest-input");
let destTextEl = document.getElementById("dest-text");

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2dyaWNoZW5zIiwiYSI6ImNsZGNlZXUyazA5YjUzcHA2ejhuaTBld3YifQ.dtar1LhXriGs-PkHHHq5yg";

findOutButtonEl.addEventListener("click", mindsetPage);

function mindsetPage(event) {
  event.preventDefault();
  mindsetEl.classList.remove("hidden");
  landingPageEl.classList.add("hidden");
  tagEl.classList.add("hidden");
  titleEl.classList.add("text-white");
  headerEl.classList.replace("bg-blue-300", "bg-blue-900");
  titleEl.textContent = "Which best describes your current mindset?";
  titleEl.classList.replace("text-5xl", "text-3xl");
  titleEl.classList.remove("italic");
  titleEl.classList.add("text-center");
}

insecureEl.addEventListener("click", locationPage);
guiltEl.addEventListener("click", locationPage);
defiantEl.addEventListener("click", locationPage);
introvertedEl.addEventListener("click", intrDataPage);

function locationPage(event) {
  event.preventDefault();
  mindsetEl.classList.add("hidden");
  locationQuesEl.classList.remove("hidden");
  titleEl.textContent = "What is your current location?";
}

function intrDataPage(event) {
  event.preventDefault();
  mindsetEl.classList.add("hidden");
  dataAnalysisEl.classList.remove("hidden");
  titleEl.textContent = "Data Analysis";
  dataTextEl.textContent = "That's cool. You should stay in.";
}

locationNextEl.addEventListener("click", destinationPage);

function destinationPage(event) {
  event.preventDefault();
  locationQuesEl.classList.add("hidden");
  destinationQuesEl.classList.remove("hidden");
  titleEl.textContent = "Where are you planning on going/supposed to go?";
}

destinationNextEl.addEventListener("click", answerPage);

function answerPage(event) {
  event.preventDefault();
  destinationQuesEl.classList.add("hidden");
  answerEl.classList.remove("hidden");
  titleEl.classList.replace("text-3xl", "text-5xl");
  titleEl.textContent = "Should I go out?";

  shouldIGoOut();
}

whyButtonEl.addEventListener("click", dataPage);

function dataPage(event) {
  event.preventDefault();
  answerEl.classList.add("hidden");
  dataAnalysisEl.classList.remove("hidden");
  titleEl.classList.remove("text-center");
  titleEl.textContent = "Data Analysis";
  titleEl.classList.replace("text-5xl", "text-3xl");

  shouldIGoOut();
}

refreshButtonEl.addEventListener("click", function () {
  location.reload();
});

localFormEl.addEventListener("submit", fetchWeather);

const apiKey = "2b53fe9e9a97281c32a772fc33b1d0b7";
let city;

function fetchWeather(event) {
  event.preventDefault();

  city = localInputEl.value.trim();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const latitude = data.coord.lat;
      const longitude = data.coord.lon;
      const description = data.weather[0].description;
      let location = document.querySelector(".current-location");
      location.textContent = city;
      let message = document.querySelector(".current-weather");
      message.textContent = `Current Weather Condition: ${description}.`;
      fahrenheit = Math.round((parseFloat(data.main.temp) - 273.15) * 1.8 + 32);
      document.getElementById("current-temp").innerHTML =
        "Temp: " + fahrenheit + "\u00B0" + " F";
      locErrorEl.textContent = "";
      localWeatherEl.classList.remove("hidden");
      localFormEl.classList.add("hidden");

      let locationEntry = {
        cityName: city,
        lat: latitude,
        lon: longitude,
        temp: data.main.temp,
        condition: data.weather[0].main,
      };

      localStorage.setItem("savedLocation", JSON.stringify(locationEntry));
    })
    .catch(
      (error) => localWeatherEl.classList.add("hidden"),
      localFormEl.classList.remove("hidden"),
      (locErrorEl.textContent = "Please enter a valid location")
    );
  localInputEl.value = "";
}

destInputEl.addEventListener("submit", formSubmitCity);

function formSubmitCity(event) {
  event.preventDefault();
  destination = destTextEl.value.trim();
  localStorage.setItem("savedDestination", destination);
  let savedEntry = JSON.parse(localStorage.getItem("savedLocation"));
  let longitudeLoc = savedEntry.lon;
  let latitudeLoc = savedEntry.lat;

  let urlDest = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}`;

  fetch(urlDest)
    .then((response) => response.json())
    .then((data) => {
      let latitudeDest = data.coord.lat;
      let longitudeDest = data.coord.lon;
      let destLocation = document.querySelector(".destination-location");
      destLocation.textContent = destination;

      let to = [longitudeDest, latitudeDest];
      let from = [longitudeLoc, latitudeLoc];

      let options = {
        units: "miles",
      };

      let distance = turf.distance(to, from, options);
      let value = document.getElementById("map-overlay");
      let miles = distance.toFixed([2]);
      localStorage.setItem("miles", miles);
      value.innerHTML =
        "Distance to your destination: " + distance.toFixed([2]) + " miles";

      destErrorEl.textContent = "";
      destRetrievedEl.classList.remove("hidden");
      destInputEl.classList.add("hidden");
    })

    .catch(
      (error) => destRetrievedEl.classList.add("hidden"),
      (destErrorEl.textContent = "Please enter a valid destination")
    );

  destTextEl.value = "";
}

function shouldIGoOut() {
  let condition;
  let temperature;
  let weather;
  let distance;
  let savedWeather = JSON.parse(localStorage.getItem("savedLocation"));
  if (savedWeather.condition == "Clouds" || savedWeather.condition == "Clear") {
    condition = "good";
  } else {
    condition = "bad";
  }
  if (savedWeather.temp <= 275 || savedWeather.temp >= 300) {
    temperature = "bad";
  } else temperature = "good";
  if (condition == "good" && temperature == "good") {
    weather = "thumbsup";
  } else {
    weather = "thumbsdown";
  }
  let savedMiles = localStorage.getItem("miles");
  if (savedMiles <= 60) {
    distance = "closeby";
  } else {
    distance = "faraway";
  }

  if (weather == "thumbsup" && distance == "closeby") {
    document.getElementById("should").textContent = "YES, YOU SHOULD GO OUT!";
  } else {
    document.getElementById("should").textContent = "NO, YOU SHOULD NOT GO OUT";
  }

  if (weather == "thumbsup" && distance == "closeby") {
    dataTextEl.textContent =
      "The weather is good, and your destination is not too far away. Go out!";
  } else if (weather == "thumbsup" && distance == "faraway") {
    dataTextEl.textContent =
      "The weather is good, but your destination is too far away. Stay in!";
  } else if (weather == "thumbsdown" && distance == "closeby") {
    dataTextEl.textContent =
      "Your destination is close by, but the weather is bad. Stay in!";
  } else {
    dataTextEl.textContent =
      "The weather is bad, and your destination is too far away. Stay in!";
  }
}

let recentLocEl = document.getElementById("recent-loc");
let savedSearch = JSON.parse(localStorage.getItem("savedLocation"));

let savedCity = savedSearch.cityName;

recentLocEl.textContent = "Your most recent location: " + savedCity;

let recentDestEl = document.getElementById("recent-dest");
let savedDest = localStorage.getItem("savedDestination");

recentDestEl.textContent = "Your most recent destination: " + savedDest;
