export default async function fetchWeather(lon,lat){
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
        const data = await resp.json();
}

