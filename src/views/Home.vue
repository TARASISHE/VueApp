<template>
<!--  <Transition name="toast">
  <ToastVue name="Welcome to your account">
  </ToastVue>
  </Transition>-->
  <div class="wrapper">
    <div class="container">
      <div>
        <ul class="flex-center">
          <li v-for="card in cards"  :key="card">
        <Card 
        :title="card.title"
        :text="card.text"
        :navigation="card.navigation"
        >
        </Card>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <router-view/>
</template>

<script>

import Card from '../components/Card.vue'

export default {
props:{
    name:{
      type:String
    },
  },
  components:{
  Card,
  },  
  data(){
    return{
      cards:[        
        {
          title:"Calculator",
          text : "This is simple calculator which help you to do a mathematic`s calculations.Try to use app-calculator!",
          navigation: '/calculator',
        },
        {
         title:"Todo-List",
         text : "It is a good app if you need to write some important affairs which you don`t want to forget.Try to use app-todo-list!",
         navigation:"/todo",
        },
        {
        title:"Weather Forecast",
        text : "If you are going to travel somewhere, you should use this weather foreacts.Try to use app-weather-forecast!",
        navigation:"/weather-forecast",
        } 
      ]
    }
  },
}

</script>

<style >

.wrapper{
  min-height: 93.4vh;
	background-color: #c4dfe6;
  
}

.container{
    max-width: 1280px;
    margin: 0 auto;
  }

.flex-center{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}



</style>
