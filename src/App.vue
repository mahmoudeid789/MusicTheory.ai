<template>
  <div id="app">
    <v-app
      class="vueWrap"
      :style="$route.name === 'Home' ? 'background:rgb(250,250,250)' : 'background:#192629'"
    >
      <router-view />
      <div class="footerWrap">
        <Footer />
      </div>
    </v-app>
  </div>
</template>

<script>
import Transcribe from "./components/Transcribe.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Footer
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600");
@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500");
@import url("https://fonts.googleapis.com/css?family=Raleway:200,300,400,500,600");

html,
body {
  background: #192629;
  position: relative;
  min-height: 100%;
}
.vueWrap {
  height: 100%;
  /* font-family: "Poppins", sans-serif !important; */
  font-family: "Open Sans", sans-serif !important;
  background: rgb(250, 250, 250);
}
#app {
  height: 100%;
}
</style>
