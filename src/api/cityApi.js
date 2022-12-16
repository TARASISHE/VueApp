export default async function getSearchResults(){
        const result = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.query}.json?access_token=${this.cityApiKey}&types=place`);
        const data = await result.json();
        return  data.features;
  };