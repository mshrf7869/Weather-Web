const search = document.querySelector(".searchbar");
const btn = document.querySelector("button");
let city = document.querySelector(".city");
const degree = document.querySelector(".temp");
// const Time = document.querySelector("#time");
const humidity = document.querySelector("#humidt");
const speed = document.querySelector("#speed");
const feels = document.querySelector("#feels");
const Sunrise = document.querySelector("#sunrise");
const Sunset = document.querySelector("#sunset");
const type = document.querySelector("#type");
const typeimg = document.querySelector(".WeatherType");
const max = document.querySelector(".max");
const min = document.querySelector(".min");
const weatherImg = document.querySelector(".weatherImgg");
const imgContainer=document.querySelector('.imageContainer');

let cityN = "Asansol";
let lati;
let longi;

search.addEventListener("submit", (e) => {
  e.preventDefault();
  cityname = document.querySelector("input");
  console.log(cityname.value);
  cityN = cityname.value;
  loadWeather();
  cityname.value = "";
});
function bgImageChanger(data){ //for Background changer According to weather
    if (data.weather[0].main == "Clouds") {
      imgContainer.style.backgroundImage="url('newpic/cloudbg.jpg')";
    } else if (data.weather[0].main == "Clear") {
      imgContainer.style.backgroundImage="url('newpic/clearbg.jpg')";
    } else if (data.weather[0].main == "Thunderstorm") {
      imgContainer.style.backgroundImage="url('newpic/thunderbg.jpg')";
    } else if (data.weather[0].main == "Drizzle") {
      imgContainer.style.backgroundImage="url('newpic/cloudbg.jpg')";
    } 
     else if (data.weather[0].main == "Mist") {
      imgContainer.style.backgroundImage="url('newpic/mistbg.jpg')";
    } else if (data.weather[0].main == "Haze") {
      imgContainer.style.backgroundImage="url('newpic/hazebg.jpg')";
    }
}

function showIcons(data,data2){ //for weather icons according to weather
  const currDate=new Date(data.dt*1000);
  const hours=currDate.getHours();
  console.log(hours);
typeimg.src=`http://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}.png`;
weatherImg.src=`http://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}.png`;
}

 function fetchForcaste(data2){  //for forcaste weather for five days
  document.querySelector('#one').innerHTML=`
          <img src="http://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}.png" alt="">
          <h2>${new Date(data2.list[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h2>
          <h1>${Math.round(data2.list[0].main.temp)}°C</h1>` 

          document.querySelector('#two').innerHTML=`
          <img src="http://openweathermap.org/img/wn/${data2.list[8].weather[0].icon}.png" alt="">
          <h2>${new Date(data2.list[8].dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h2>
          <h1>${Math.round(data2.list[8].main.temp)}°C</h1>` 

          document.querySelector('#three').innerHTML=`
          <img src="http://openweathermap.org/img/wn/${data2.list[16].weather[0].icon}.png" alt="">
          <h2>${new Date(data2.list[16].dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h2>
          <h1>${Math.round(data2.list[16].main.temp)}°C</h1>`

          document.querySelector('#four').innerHTML=`
          <img src="http://openweathermap.org/img/wn/${data2.list[24].weather[0].icon}.png" alt="">
          <h2>${new Date(data2.list[24].dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h2>
          <h1>${Math.round(data2.list[24].main.temp)}°C</h1>`

          document.querySelector('#five').innerHTML=`
          <img src="http://openweathermap.org/img/wn/${data2.list[32].weather[0].icon}.png" alt="">
          <h2>${new Date(data2.list[32].dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h2>
          <h1>${Math.round(data2.list[32].main.temp)}°C</h1>`
    
  }

const loadWeather = async () => {
  const apiKey = "5c28f6366e2d155fc3e9071213bbcd1d";
  const oldURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityN}&APPID=${apiKey}`;
  try {
    const response = await fetch(oldURL);
    const data = await response.json();
    console.log(data);
    longi = data.coord.lon;
    lati = data.coord.lat;
    city.textContent = data.name + ", " + data.sys.country;
    degree.innerHTML = `${data.main.temp.toFixed()}&#176`;
    max.textContent = "Max " + data.main.temp_max.toFixed() + "°";
    min.textContent = "Min " + data.main.temp_min.toFixed() + "°";
    humidity.textContent = data.main.humidity + "%";
    speed.textContent = data.wind.speed + "km/h";
    feels.textContent = data.main.feels_like + "°c";
    type.textContent = data.weather[0].main;

    const newURL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lati}&lon=${longi}&exclude=hourly,minutely&appid=${apiKey}`;
    const res = await fetch(newURL);
    const data2 = await res.json();
    console.log(data2);
   
    bgImageChanger(data); //Bgimage call

    let { sunset, sunrise } = data2.city;
    Sunrise.innerHTML = `<p class="humidity" id="sunrise">${window
      .moment(sunrise * 1000)
      .format("HH:mm a")}</p>
                <p>Sunrise</p>`;
       Sunset.innerHTML=`<div class="text">
                <p class="speed" id="sunset">${window
                  .moment(sunset * 1000)
                  .format("HH:mm a")}</p>
                <p>Sunset</p>
              </div>`  
         showIcons(data,data2); //icon call format('YYYY-MM-DD HH:mm a')
         fetchForcaste(data2); //forcaste function call
  } catch (error) {
    console.log(error, " API getting not fetched properly");
  }
};

window.addEventListener("load", loadWeather());
