<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Nunito%20Sans:600,700,800" rel="stylesheet" type="text/css">
    <Loader/>
  </div>
</template>

<script>
import Loader from './components/Loader.vue'

export default {
  name: 'App',
  components: {
    Loader
  }
}
</script>

<style>
body{
  margin: 0 !important;
}
#app {
  font-family: "Nunito Sans", "Open Sans", "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
