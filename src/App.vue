<template>
      <SkeletonHeader v-if="!$store.state.skeletonLoaded"></SkeletonHeader>
      <Header v-if="$store.state.user"></Header>
      <transition name="fade" mode="out-in">
      <Spinner v-if="!$store.state.userIsLoaded"></Spinner>
      <router-view v-else />
      </transition> 
</template>
  

<script>
import Header from './components/Header.vue';
import Spinner from './components/Spinner.vue'
import SkeletonHeader from './components/SkeletonHeader.vue';
export default{
  components:{
    Header,
    Spinner,
    SkeletonHeader,
  },
  created(){
    this.$store.dispatch('fetchUser')
  }
}
</script>

<style>

.fade-enter-from{
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-enter-active{
  transition: all 1s ease;
}
.fade-leave-from{
  opacity: 1;
}
.fade-leave-to{
  opacity: 0;
}
.fade-leave-active{
  transition: all 1s ease;
}

</style>