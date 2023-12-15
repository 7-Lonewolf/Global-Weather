// Selecting DOM elements
const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".temp_location p#city");
const stateField = document.querySelector(".temp_location p#state");
const dateField = document.querySelector(".temp_location span");
const emojiField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let cityName = 'Begusarai' // Default City 

//Adding event listener and execution of events
form.addEventListener('submit', event =>{
    event.preventDefault() // Prevents the default function of Search / Submit button i.e. to refresh
    const cityName = searchField.value
    getWeatherInfo(cityName)
})

async function getWeatherInfo(cityName) { // To enable async execution of code
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=9d589e03d1934c1692c160510231212&q=${cityName}&aqi=no`);
        const weatherData = await response.json();
        console.log(weatherData);

        // now selecting the required data from the json file to execute 
        let temp = weatherData.current.temp_c
        let name = weatherData.location.name
        let state = weatherData.location.region
        let condition = weatherData.current.condition.text
        let url = weatherData.current.condition.icon
        let date = weatherData.current.last_updated

        console.log(temp, name, condition, url, date)


        // To add day 
        let splitTime = date.split(" ")
        console.log(splitTime)

        let exactDate = splitTime[0]
        let exactTime = splitTime[1]

        const d = new Date(exactDate);


        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = weekday[d.getDay()] // To extract day 

        console.log(day)

        temperatureField.innerText = temp;
        cityField.innerText = name;
        stateField.innerText = state;
        dateField.innerText = `${exactDate} ${day} ${exactTime}`;
        emojiField.src = url;
        weatherField.innerText = condition;

    } catch (error) {
        // Some random logic to prevent crashing of code all-together 
        console.log('Im catching my error: ', error)
        console.log('some logic to handle error')
    }


}

getWeatherInfo(cityName)
