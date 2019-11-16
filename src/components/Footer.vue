<template>
  <v-footer class="footer" dark height="auto">
    <v-card
      flat
      tile
      class="lighten-1 white--text text-xs-center card"
      :color="$route.name === 'Home' ? '#2b4349' : '#192629'"
    >
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-3 primary--text" icon>
          <a href="https://github.com/kadinzhang/MusicTheory.ai">
            <v-icon size="24px">{{ icon }}</v-icon>
          </a>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="copy">
        &copy;{{new Date().getFullYear()}} —
        <span class="name">HopAI</span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      icons: ["fab fa-github", "fab fa-twitter"]
    };
  }
};
</script>

<style lang="scss">
.copy {
  font-weight: 200;
}
.card {
  width: 100%;
  margin: auto;
}
.footer {
  width: 100%;
  bottom: 0 !important;
  position: absolute;
}
.name {
  font-weight: 300;
}
a {
  text-decoration: none;
}
</style>

