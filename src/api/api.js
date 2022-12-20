 async function apiGetResults(){
        const result = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.query}.json?access_token=${import.meta.env.VITE_CITYFIND_API_KEY}&types=place`);
        const data = await result.json();
        return  data.features;
  };

  async function apiGetWeather(lat,lon){
      const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);
      const data = await resp.json();
      return data
}

export {apiGetResults, apiGetWeather}