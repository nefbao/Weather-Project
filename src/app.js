//set day --------------------------------------------------------------------------------------------------------------
//set today
let now = new Date();
let todaysDay = document.querySelectorAll("#todays-day");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
todaysDay.forEach(function (col) {
  col.innerHTML = days[now.getDay()];
});

//set forecast days
let forecastDay = document.querySelectorAll(".foreDay");
let j = 1;
forecastDay.forEach(function (day) {
  if (now.getDay() + j < 7) {
    day.innerHTML = days[now.getDay() + j].substring(0, 3);
  } else {
    day.innerHTML = days[now.getDay() + j - 7].substring(0, 3);
  }
  j = j + 1;
});

//set forecast dates ----------------------------------------------------------------------------------------------------
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let mnthName = document.querySelectorAll(".monthName");

mnthName.forEach(function (day) {
  now.setDate(now.getDate() + 1);
  day.innerHTML = months[now.getMonth()];
});
now = new Date();
let forecastDate = document.querySelectorAll(".foreDate");

forecastDate.forEach(function (day) {
  now.setDate(now.getDate() + 1);
  day.innerHTML = now.getDate();
});
now = new Date();

//set hour --------------------------------------------------------------------------------------------------------------
let thisHour = document.querySelectorAll("#hour");
//let i = 3;
thisHour.forEach(function (t) {
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  //  if (hour - i < 24) {
  //    hour = hour - i;
  //  } else {
  //    hour = hour - i - 24;
  //  }
  if (hour < 10) {
    t.innerHTML = `0${hour}:${minutes}`;
  } else {
    t.innerHTML = `${hour}:${minutes}`;
  }
  //  i = i - 1;
});

// ---------------------------------------------------------------------------------------------------

function displayForecast(response) {
  console.log(response.data.daily);
  forecastVariable = response.data.daily;
  let forcastEmojis = document.querySelectorAll(".emoji");
  forcastEmojis.forEach(function (day, index) {
    day.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${
        response.data.daily[index + 1].weather[0].icon
      }@2x.png`
    );
  });

  //set highest degree
  let highestDegree = document.querySelectorAll(".highest");
  highestDegree.forEach(function (day, index) {
    day.innerHTML = Math.round(response.data.daily[index + 1].temp.max);
  });

  //set lowest degree
  let lowestDegree = document.querySelectorAll(".lowest");
  lowestDegree.forEach(function (day, index) {
    day.innerHTML = Math.round(response.data.daily[index + 1].temp.min);
  });
}

function getForcast(coordinates) {
  let apiKey = "29a7fe4cccbf011560f42be2276ac125";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".degree");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  getForcast(response.data.coord);
  //display weather description
  let weatherDescription = document.querySelector(".weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].description;
  //display Wind Speed
  let windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerHTML = response.data.wind.speed;
  //display Humidity
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = response.data.main.humidity;
  //display weather icon
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //unit conversion settings
  const celciusStyle = document.querySelector(".celcius");
  const farenheitStyle = document.querySelector(".farenheit");
  farenheitStyle.style.color = "blueviolet";
  farenheitStyle.style.cursor = "pointer";
  celciusStyle.style.color = "black";
  celciusStyle.style.cursor = "default";
}
function inputCity(event) {
  event.preventDefault();
  let cityName = document.querySelector(".searchInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityName.value;
  let apiKey = "29a7fe4cccbf011560f42be2276ac125";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric`;
  axios.get(`${apiUrl}&appId=${apiKey}`).then(showTemp);
}
function showFarenheit(event) {
  currentTemp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  const celciusStyle = document.querySelector(".celcius");
  const farenheitStyle = document.querySelector(".farenheit");
  celciusStyle.style.color = "blueviolet";
  celciusStyle.style.cursor = "pointer";
  farenheitStyle.style.color = "black";
  farenheitStyle.style.cursor = "default";

  //set highest degree in farenheit
  let highestDegree = document.querySelectorAll(".highest");
  highestDegree.forEach(function (day, index) {
    day.innerHTML = Math.round(
      (forecastVariable[index + 1].temp.max * 9) / 5 + 32
    );
  });

  //set lowest degree in farenheit
  let lowestDegree = document.querySelectorAll(".lowest");
  lowestDegree.forEach(function (day, index) {
    day.innerHTML = Math.round(
      (forecastVariable[index + 1].temp.min * 9) / 5 + 32
    );
  });
  let forecsatDegree = document.querySelectorAll(".forecastDegree");
  forecsatDegree.forEach(function (tag) {
    tag.innerHTML = "℉";
  });
}

function showCelcius(event) {
  currentTemp.innerHTML = celsiusTemperature;
  const celciusStyle = document.querySelector(".celcius");
  const farenheitStyle = document.querySelector(".farenheit");
  farenheitStyle.style.color = "blueviolet";
  farenheitStyle.style.cursor = "pointer";
  celciusStyle.style.color = "black";
  celciusStyle.style.cursor = "default";

  //set highest degree in celcius
  let highestDegree = document.querySelectorAll(".highest");
  highestDegree.forEach(function (day, index) {
    day.innerHTML = Math.round(forecastVariable[index + 1].temp.max);
  });

  //set lowest degree in celcius
  let lowestDegree = document.querySelectorAll(".lowest");
  lowestDegree.forEach(function (day, index) {
    day.innerHTML = Math.round(forecastVariable[index + 1].temp.min);
  });
  let forecsatDegree = document.querySelectorAll(".forecastDegree");
  forecsatDegree.forEach(function (tag) {
    tag.innerHTML = "℃";
  });
}

let currentTemp = document.querySelector(".degree");
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", inputCity);
let farenheit = document.querySelector(".farenheit");
farenheit.addEventListener("click", showFarenheit);
let celcius = document.querySelector(".celcius");
celcius.addEventListener("click", showCelcius);

let apiKeyInitial = "29a7fe4cccbf011560f42be2276ac125";
let apiUrlInitial = `https://api.openweathermap.org/data/2.5/weather?q=Mashhad&units=metric`;
axios.get(`${apiUrlInitial}&appId=${apiKeyInitial}`).then(showTemp);
let forecastVariable = null;
