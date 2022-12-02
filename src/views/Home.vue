<template>
  <HeaderVue></HeaderVue>
  <div class="wrapper">
    <div class="container">
      <div class="flex-center">
        <CardVue></CardVue>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script>
import HeaderVue from '../components/Header.vue'
import CardVue from '../components/Card.vue'


export default {
components:{
  HeaderVue,
  CardVue,
}
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



a{
  text-decoration: none;
}
li{
  list-style: none;
}
.wrapper{
  min-height: 93.4vh;
	background-color: #c4dfe6;
}
.container{
  max-width: 1280px;
  margin: 0 auto;
}

@media  screen and (max-width: 950px){
  body{
    overflow-y: auto;
}
  }


</style>
