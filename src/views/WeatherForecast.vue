<template>

    <div id="apps" :class="changePicture">
      <main>
        <div class="search-box">
          <input 
            type="text" 
            class="search-bar" 
            placeholder="Search..."
            v-model="query"
            @input="getSearchResults"
          />
      <ul class="search-filter"  v-if="this.searchCityPanel">
            <li class="search-item" 
            v-for="city in cities"
            :key="city.id"
            @click="appendCity(city.place_name, city.geometry.coordinates)"
            > 
              {{city.place_name}}
            </li> 
          </ul>
        </div>
        <div v-if="loading">
          <Spinner></Spinner>  
        </div>
  
        <div class="weather-wrap" v-if="weather.main">
          <div class="location-box">
            <div class="location"> {{query}}</div>
            <div class="date">{{ dateBuilder  }}</div>
          </div>
  
          <div class="weather-box">
            <div class="temp"> {{ Math.round(weather.main.temp)}}°C</div>
            <div class="weather">{{weather.weather[0].main}}</div>
          </div>
        </div>
      </main>
    </div>
  </template>
<script>
import Spinner from '../components/Spinner.vue';
//  import {apiGetResults, apiGetWeather} from '../api/api.js'
export default{
  components:{
    Spinner,
  },
    data(){
        return{
            // apiKey:'776cbefeb4e33b7b80b3a1af5b49be36',
            urlBase: 'https://api.openweathermap.org/data/2.5/',
            query: '',
            weather: {},
            loading:false,
            queryTimeout:null,
            // cityApiKey:"pk.eyJ1IjoidGFyYXNpc2hlIiwiYSI6ImNsYXh4ZDJjbzA2M2Yzem81c3Z6ZTFsMDgifQ.TYjCtwTUeohyUJo_ustV5w",
            cities:{},
            searchCityPanel:false,
        }
    },
    methods:{
        async fetchWeather(lon,lat){
          this.loading = true;
          try{
              const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);
              const data = await resp.json();
              this.weather = data;
              // findhWeather(lon,lat)
              // this.weather = await apiGetWeather();
          } catch (e){
            alert(`Error:${e}`)
          } finally{
            this.loading= false;
          }
        },
        getSearchResults(){
          this.searchCityPanel=true;
          clearTimeout(this.queryTimeout);
          this.queryTimeout = setTimeout(async ()=>{
            if(this.query !== ''){
              const result = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.query}.json?access_token=${import.meta.env.VITE_CITYFIND_API_KEY}&types=place`);
              const data = await result.json();
              this.cities = data.features;
              // apiGetResults()
              // this.cities=apiGetResults()
            }
          },300)
        },
        appendCity(city,[lon,lat]){
          this.searchCityPanel=true;
          this.query = city
          this.fetchWeather(lon,lat)
          this.searchCityPanel=false;
        }
    },
    computed:{
      changePicture(){
        if(this.weather.main && this.weather.main.temp > 16){
          return 'warm'
        } else if ( this.weather.main && this.weather.main.temp < 16){
          return 'cold'
        } else {
          return ''
        }
    },
    dateBuilder () {
            let d = new Date();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const day = days[d.getDay()];
            const date = d.getDate();
            const month = months[d.getMonth()];
            const year = d.getFullYear();
            return `${day} , ${date} ${month} ${year}`;
        },

  },
  created(){
    console.log
  }
}
</script>

<style>

#apps {
  background-color: var(--light-color);
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  background-repeat: no-repeat;
}

#apps.warm {
  background-image: url(../img/1251841.jpg);
}

#apps.cold{
    background-image: url(../img/475004-snow-pine_trees-sunrise.jpg);
}

main {
  min-height: 100vh;
  padding: 25px;
}
.search-box {
    display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
  position: relative;
}
.search-box .search-bar {
  display: block;
  width: 80%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border:none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16px 16px 0px 0px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 0px 16px 0px 0px;
}
.location-box .location {
  color: #FFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}
.location-box .date {
  color: #FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color:rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
.weather-box .weather {
  color: #FFF;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.search-filter{
  position: absolute;
  top: 100%;
  background-color: rgba(255, 255, 255, 1.753);
  width: 80%;
  height: 215px;
  border-radius: 0px 0px 16px 16px;
}

.search-item{
  padding: 10px;
}

@media screen and (max-width:800px){
  .weather-wrap{
    padding-top: 100px;
  }
  }
</style>