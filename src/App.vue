<template>
  <div>
      <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/home/Home';
export default {
    components:{
      Home,
    },
}
</script>

<style lang="scss">
  *{
    list-style: none;
    box-sizing: border-box;
  }
</style>
