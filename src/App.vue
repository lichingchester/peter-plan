<template>
  <div id="app">
    <!-- <Header /> -->

    <!-- trailer-text -->
    <Trailer />

    <!-- <MuteButton /> -->
    <LandingLayout />
  </div>
</template>

<script>
import LandingLayout from "@/layouts/Landing.vue";
import Trailer from "@/components/partials/Trailer.vue";

export default {
  name: "app",
  components: {
    LandingLayout,
    Trailer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
