<template>
  <HeaderVue/>
<!--  <Transition name="toast">
  <ToastVue name="Welcome to your account">
  </ToastVue>
  </Transition>-->
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
import ToastVue from '../components/Toast.vue';


export default {
props:{
    name:{
      type:String
    },
  },
  components:{
  HeaderVue,
  CardVue,
  ToastVue,
  },  
  data(){
    return{
    }
  },
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

  .toast-enter-from {
    opacity: 0;
    transform: translateY(-70px);
  }

  .toast-enter-active {
    transition: all 0.3s ease;
  }
 
  .toast-leave-to {
    opacity: 0;
    transform: translateY(-70px);
  }
  .toast-leave-active {
    transition: all 0.3s ease;
  }


@media  screen and (max-width: 950px){
  body{
    overflow-y: auto;
}
  }


</style>
