<template>
    <div>
        <section class="hero">
            <v-container class="content">
                <v-layout>
                    <v-flex sm2>
                        <div class="block">
                            <h1>MusicTheory.ai</h1>
                        </div>
                    </v-flex>
                    <v-flex sm3.3>
                        <div class="block">
                            <h1>MusicTheory.ai</h1>
                        </div>
                    </v-flex>
                    <v-flex sm3.3>
                        <div class="block">
                            <h1>MusicTheory.ai</h1>
                        </div>
                    </v-flex>
                    <v-flex sm3.3>
                        <div class="block">
                            <h1>MusicTheory.ai</h1>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </div>
</template>

<script>
// gsap
import { TweenMax } from "gsap";

export default {
    name: "Home",
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.hero {
    height: 600px;
    background: #192629 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
        height: 150px;
        .block {
            display: inline;
        }
    }
}
</style>