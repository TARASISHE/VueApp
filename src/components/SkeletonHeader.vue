<template>
    <div id="nav" class="nav"><!--v-if="$store.state.user"--> 
      <div class="container">
        <div class="flex-center-between">
            <ul class="list">
                <li class="list-link"></li>
                <li class="list-link"></li>
                <li class="list-link"></li>
                <li class="list-link"></li>
              </ul>
            <button class="btn-logout" @click="$store.dispatch('logout')" >Logout</button>
        </div>
      </div>
   </div>   
</template>

<style scoped>

  .nav{
    width: 100%;
    height: 50px;
    background-color: var(--medium-dark); 
    padding-bottom: 50px;
  
  }
   
  .list-link{
    width: 70px;
    height: 15px;
    animation: pulse-bg 2s infinite;
  }

  .btn-logout{
    border: none;
    font-size: 16px;
    color: var(--medium-dark) ;
    width: 100px;
    height: 25px;
    border-radius: 5px;
    background-color: var(--medium-light);
    color: #FFF;
    background-image: linear-gradient(#c4dfe6,#c4dfe6);
    background-size: 0 100%;
    background-repeat: no-repeat;
    transition: .4s;
    cursor: pointer;
    
  }
  .btn-logout:hover{
    background-size: 100% 100%;
    color: var(--medium-dark);

  }

  @keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #eee;
  }
}

</style>