const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'dc68b30005acd52af9d912883187748c';
const cities = ["Delhi", "Meerut", "Noida"];
const fetchWeather = (city)=>{
    cityName.innerHTML = city;
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("data", data);
            temp.innerHTML = data.main.temp
            temp_max.innerHTML = data.main.temp_max
            temp_min.innerHTML = data.main.temp_min
            feels_like.innerHTML = data.main.feels_like
            grnd_level.innerHTML = data.main.grnd_level
            sea_level.innerHTML = data.main.sea_level
            speed.innerHTML = data.wind.speed
            deg.innerHTML = data.wind.deg
            humidity.innerHTML = data.main.humidity
            pressure.innerHTML = data.main.pressure
            sunrise.innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            sunset.innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}


const fetchWeatherForCities = () => {
    cities.forEach(city => {
        const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("data", data);

                // Find the table row for the city
                const tableRows = document.querySelectorAll("tbody tr");
                let targetRow = null;

                tableRows.forEach(row => {
                    const cityNameCell = row.querySelector("th");
                    if (cityNameCell && cityNameCell.textContent.trim() === city) {
                        targetRow = row;
                    }
                });

                if (targetRow) {
                    const cells = targetRow.querySelectorAll("td");
                    cells[0].innerHTML = data.main.temp; // Current temperature
                    cells[1].innerHTML = data.main.temp_max; // Max temperature
                    cells[2].innerHTML = data.main.temp_min; // Min temperature
                    cells[3].innerHTML = data.main.feels_like; // Feels like temperature
                    cells[4].innerHTML = data.wind.speed; // Wind speed
                    cells[5].innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString(); // Sunrise
                    cells[6].innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString(); // Sunset
                }
            })
            .catch(error => {
                console.error(`Error fetching weather data for ${city}:`, error);
            });
    });
};

// Call the function on page load
fetchWeatherForCities();

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    const city=document.getElementById("searchCity");
    console.log("city value",city.value);
    fetchWeather(city.value);
})

fetchWeather("Noida");


const link = document.getElementById("dynamic-link");

// Array of colors to cycle through
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6", "#E74C3C"];

let currentIndex = 0;

// Function to change the link color every second
setInterval(() => {
  link.style.color = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length; // Loop back to the start of the array
}, 500);





