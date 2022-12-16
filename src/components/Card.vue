<template>
    <div class="flex-items">
    <div class="item"> 
        <h3 class="item-title">{{title}}</h3>
        <p class="item-text">{{text}}</p> 
        <button class="btn-card"> 
            <router-link :to="navigation"> Try</router-link>
        </button>
    </div>
</div>
</template>

<script>
export default {
    props:{
        title: {
        type: String
        },
        text: {
        type: String
        },
        navigation: {
        type: String
        },
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
    background-color: var(--medium-light);
    box-shadow: 10px 5px 5px #15afb7;
    
}
.item-title {
    text-transform: uppercase;
    color: var(--medium-dark);
    text-align: center;
    font-size: 21px;
}
.item-text{
    font-size: 16px;
    margin-top: 40px; 
    text-align: center;
    max-width: 230px;
    color:  var(--medium-dark);
}

.btn-card {
    font-size: 16px;
    width: 150px;
    height: 30px;
    border-radius: 15px;
    background-color: var(--medium-dark);
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
    color:  var(--medium-dark);
  }

.btn-card a{
    color:  var(--light-color);
    padding:10px 60px;
}
@media  screen and (max-width: 768px){
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