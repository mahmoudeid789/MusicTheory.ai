<template>
    <div>
        <section class="hero">
            <v-container class="content">
                <v-layout row class="main">
                    <v-flex sm6 class="logo">
                        <p>
                            <v-icon color="primary">queue_music</v-icon>MusicTheory.ai
                        </p>
                    </v-flex>
                    <v-flex sm6 class="slogan">
                        <p>The future of
                            <br>music creation
                        </p>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex sm4 class="step">
                        <p>Upload Audio</p>
                        <div class="r1">
                            <AudioSVG/>
                        </div>
                    </v-flex>
                    <v-flex sm4 class="step">
                        <p>Define Progression</p>
                        <h1 class="primary--text">
                            I – V –
                            <span>vi</span> – IV
                        </h1>
                    </v-flex>
                    <v-flex sm4 class="step">
                        <p>Get Generated Music</p>
                        <div class="r2">
                            <Loader/>
                        </div>
                    </v-flex>
                </v-layout>
                <v-layout row class="go">
                    <v-flex sm12>
                        <v-btn outline>Get Started</v-btn>
                        <v-btn outline>Learn More</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
        <section class="information">
            <h1>hi</h1>
        </section>
    </div>
</template>

<script>
import { TweenMax } from "gsap";
import AudioSVG from "./AudioSVG";
import ProgressionSVG from "./ProgressionSVG";
import Loader from "./Loader";

export default {
    name: "Home",
    components: {
        AudioSVG,
        ProgressionSVG,
        Loader
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.hero {
    height: 60vh;
    min-height: 500px;
    background: #192629 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
        max-width: 1000px;
        .main {
            margin-bottom: -20px;
        }
        .logo {
            margin-bottom: 70px;
            p {
                margin-top: -27px;
                text-align: right;
                font-size: 30px;
                padding: 20px;
                font-weight: 300;
                i {
                    font-size: 34px;
                }
            }
        }
        .slogan {
            p {
                border-left: 1px white solid;
                padding: 0 20px;
                line-height: 32px;
                font-size: 30px;
                font-weight: 400;
            }
        }
        .step {
            .r1 {
                margin-top: 10px;
            }
            .r2 {
                margin-top: -19px;
            }
            text-align: center;
            p {
                font-size: 18px;
                font-weight: 200;
                margin-bottom: 0;
            }
            h1 {
                margin-top: 28px;
                font-size: 35px;
            }
        }
        .go {
            padding: 0px;
            text-align: center;
        }
    }
}
.information {
    height: 600px;
    background: white;
}
</style>