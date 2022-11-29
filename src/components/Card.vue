<template>
    <div class="flex-items">
    <div class="item" v-for="card in navCards"  :key="card"> 
        <h3 class="item-title">{{card.title}}</h3>
        <p class="item-text">{{card.text}}</p> 
        <button class="btn-card"> 
            <router-link :to="card.navigation"> Try</router-link>
        </button>
       
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            navCards:[
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

<style scoped>

.flex-items{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    gap:60px;
    padding: 75px 15px 0px 15px;
}
.item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    border-radius: 15px;
    width: 250px;
    height: 400px;
    background-color: #66a5ad;
    box-shadow: 10px 5px 5px #15afb7;
    
}
.item-title {
    text-transform: uppercase;
    color: #07575b;
    text-align: center;
}
.item-text{
    font-size: 16px;
    margin-top: 40px; 
    text-align: center;
    max-width: 230px;
    color: #07575b;
}

.btn-card {
    font-size: 16px;
    width: 150px;
    height: 30px;
    border-radius: 15px;
    background-color:#07575b;
    border: none;
    margin-top: 40px;
    transition: all 0.3s ease 0s; 
    color: #000;
    background-image: linear-gradient(#c4dfe6,#c4dfe6);
    background-size: 0 100%;
    background-repeat: no-repeat;
    transition: .4s;
}

 .btn-card:hover{
    background-size: 100% 100%;

  }

 .btn-card a:hover{
    color: #07575b;
  }

.btn-card a{
    color: #c4dfe6;
    padding:10px 60px;
}
@media  screen and (max-width: 950px){

    .flex-items{
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 40px 15px 10px 15px;
    }
    .item{
        height: 250px;
        justify-content: center;
    }

    .item-text{
    font-size: 14px;
    margin-top: 20px; 
    }

    .btn-card {
    margin-top: 30px;
  }
  .btn-card a{
    font-size: 14px;
    }
}
</style>