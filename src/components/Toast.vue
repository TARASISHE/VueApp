<template>
    <div 
    :key="toast" 
    v-if="(toast)"
    class="toast-wrapper">
        <div class="toast">
        {{name}}
        </div>
    </div>
</template>

<script>

export default {
   props:['name'],
   data(){
    return{
      toast: true ,
    }
   },
   mounted(){
      setTimeout(() => this.toast = false ,2000)
   }
   
}

</script>

<style>
.toast-wrapper {
    position: fixed;
    width: 100%;
    top: 70px;
    left: 37%;
}
.toast {
    padding: 15px;
    color: #FFF;
    background-color: rgba(0, 0, 0, 0.6);
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.303);
    max-width: 200px;
    margin: 0 auto;
}
</style>


