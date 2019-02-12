<template>
    <div id="app">
        <v-app class="vueWrap">
            <router-view/>
            <div class="footerWrap">
                <Footer/>
            </div>
        </v-app>
    </div>
</template>

<script>
/*IDEAS
Voice Transcription
Image Recognition:
-Chemistry/Physics (elements, velocity of collision)
-Show and TEll (modeldepot) **
-Image colorization (modeldepot) **
-Emotion Classification
*/
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
body,
.application {
    height: 100%;
    /* font-family: "Poppins", sans-serif !important; */
    font-family: "Open Sans", sans-serif !important;
    /* background: #192629 !important; */
}
#app {
    height: 100%;
}
</style>
