<template>
      <Header v-if="$store.state.user"></Header>
  <router-view/>
</template>
  

<style >


</style>
<script>
import Header from './components/Header.vue';
export default{
  components:{
    Header,
  },
  created(){
    this.$store.dispatch('fetchUser')
  }
}
</script>