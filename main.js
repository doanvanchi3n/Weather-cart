const apiKey = "9247582a5bfe46aeba19de46932daf61";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)} °C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity} %`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} m/s`;

        // Thay đổi biểu tượng thời tiết và nền dựa trên loại thời tiết
        const weatherMain = data.weather[0].main;
        if (weatherMain === "Clouds") {
            weatherIcon.src = "img/clouds.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #d3d3d3, #808080)";
        } else if (weatherMain === "Clear") {
            weatherIcon.src = "img/clear.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #00feba, #5b548a)";
        } else if (weatherMain === "Rain") {
            weatherIcon.src = "img/rain.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #a1c4fd, #c2e9fb)";
        } else if (weatherMain === "Snow") {
            weatherIcon.src = "img/snow.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #e6e9f0, #eef1f5)";
        } else if (weatherMain === "Thunderstorm") {
            weatherIcon.src = "img/thunderstorm.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #5f6368, #0a0a0a)";
        } else if (weatherMain === "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #b2fefa, #0ed2f7)";
        } else if (weatherMain === "Mist") {
            weatherIcon.src = "img/mist.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #f2f2f2, #cfcfcf)";
        } else if (weatherMain === "Haze") {
            weatherIcon.src = "img/haze.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #e2c2c6, #d9a7c7)";
        } else if (weatherMain === "Fog") {
            weatherIcon.src = "img/fog.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #e0eafc, #cfdef3)";
        } else {
            weatherIcon.src = "img/default.png";
            document.querySelector(".card").style.background = "linear-gradient(135deg, #d9a7c7, #fffcdc)";
        }
        

        // Hiển thị kết quả và ẩn thông báo lỗi nếu có
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Fetch error: ", error);
        // Hiển thị thông báo lỗi và ẩn phần thời tiết
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
