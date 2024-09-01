const search =document.querySelector('.searchbar');
const btn =document.querySelector('button');
let city=document.querySelector('.city');
const degree=document.querySelector('.temp');
const humidity=document.querySelector('.humidity');
const speed=document.querySelector('.speed');
const max=document.querySelector('.max');
const min=document.querySelector('.min');
const weatherImg=document.querySelector('.weatherImgg');


 let cityN= "delhi"
search.addEventListener("submit",(e)=>{
    e.preventDefault();
    cityname=document.querySelector("input");
    console.log(cityname.value);
    cityN=cityname.value;
    loadWeather();
    cityname.value="";
})

const loadWeather=async()=>{
    const apiKey="5c28f6366e2d155fc3e9071213bbcd1d";
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityN}&APPID=${apiKey}`;
    
    try{
    const response=await fetch(apiURL);
    const data= await response.json();
    console.log(data);
    city.textContent=data.name+", "+data.sys.country;
    degree.textContent=data.main.temp.toFixed()+"°C";
    max.textContent="Max "+data.main.temp_max.toFixed()+"°C";
    min.textContent="Min "+data.main.temp_min.toFixed()+"°C";
    humidity.textContent=data.main.humidity;
    speed.textContent=data.wind.speed+"km/h";
    
       if(data.weather[0].main=="Clouds"){
         weatherImg.src="images/clouds.png";
       }
       else if(data.weather[0].main=="Clear"){
        weatherImg.src="images/clear.png";
      }
      else if(data.weather[0].main=="Thunderstorm"){
        weatherImg.src="images/thunder.png";
      }
      else if(data.weather[0].main=="Drizzle"){
        weatherImg.src="images/drizzle.png";
      }
      else if(data.weather[0].main=="Rain"){
        weatherImg.src="images/rain.png";
      }
      else if(data.weather[0].main=="Snow"){
        weatherImg.src="images/snow.png";
      }
      else if(data.weather[0].main=="Mist"){
        weatherImg.src="images/mist.png";
      }
      
    }
    catch(error) { 
           console.log(error," API getting not fetched properly")
    }
}


document.body.addEventListener('load',loadWeather());

