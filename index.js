const search = document.querySelector(".searchbar");
const btn = document.querySelector("button");
let city = document.querySelector(".city");
const degree = document.querySelector(".temp");
const Time = document.querySelector("#time");
const humidity = document.querySelector("#humidt");
const speed = document.querySelector("#speed");
const feels = document.querySelector("#feels");
const Sunrise = document.querySelector("#sunrise");
const Sunset = document.querySelector("#sunset");
const type = document.querySelector("#type");
const max = document.querySelector(".max");
const min = document.querySelector(".min");
const weatherImg = document.querySelector(".weatherImgg");
const currDay=document.querySelector("#one");
const Day1=document.querySelector("#two");
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
function bgImageChanger(data){
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

function showIcons(data,data2){
  const currDate=new Date(data.dt*1000);
  const hours=currDate.getHours();
  console.log(hours);

  if(hours>18){
    if (data.weather[0].main == "Clouds") {
      weatherImg.src = "images/cloudsN.png";
    } else if (data.weather[0].main == "Clear") {
      weatherImg.src = "images/clearN.png";
    } else if (data.weather[0].main == "Thunderstorm") {
      weatherImg.src = "images/thunderN.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherImg.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Rain") {
      weatherImg.src = "images/rainN.png";
    } else if (data.weather[0].main == "Snow") {
      weatherImg.src = "images/snow.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.src = "images/mistN.png";
    } else if (data.weather[0].main == "Haze") {
      weatherImg.src = "Images/haze.png";
    }
  }
  else{
  if (data.weather[0].main == "Clouds") {
    weatherImg.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherImg.src = "images/clear.png";
  } else if (data.weather[0].main == "Thunderstorm") {
    weatherImg.src = "images/thunder.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherImg.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Rain") {
    weatherImg.src = "images/rain.png";
  } else if (data.weather[0].main == "Snow") {
    weatherImg.src = "images/snow.png";
  } else if (data.weather[0].main == "Mist") {
    weatherImg.src = "images/mist.png";
  } else if (data.weather[0].main == "Haze") {
    weatherImg.src = "Images/haze.png";
  }
}
}

 function fetchForcaste(data2){
//  let nextdateCaste='';
  data2.list.forEach((ele,indx) => {
    if(indx<8){
      if(indx!=0){
        Day1.innerHTML=` <div>
            <img src="images/clouds.png" alt="" />
            <h2>tues</h2>
          </div>
          <h1>30°c</h1>`
      }
      else{
        
      }
    }
  });
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
   
    bgImageChanger(data);
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
         showIcons(data,data2);
         fetchForcaste(data2);
  } catch (error) {
    console.log(error, " API getting not fetched properly");
  }
};

window.addEventListener("load", loadWeather());
