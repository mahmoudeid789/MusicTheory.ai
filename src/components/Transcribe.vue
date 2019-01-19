<template>
    <div class="container secondaryBackground">
        <div class="header">
            <p>
                <span>
                    <v-icon color="primary">queue_music</v-icon>
                </span>MusicTheory.ai
            </p>
        </div>
        <div
            class="player background"
            id="player"
            v-ripple
            @click="togglePlayer"
            @mouseenter="playerHovered = true"
            @mouseleave="playerHovered = false"
        >
            <transition name="fade">
                <div
                    id="shader"
                    v-if="playerHovered && canvasLoaded"
                    @mouseenter="playerHovered = true"
                    @mouseleave="playerHovered = false"
                ></div>
            </transition>

            <div id="loading">
                <div class="musicLoader">
                    <Loader/>
                </div>
                <p>Loading Model..</p>
            </div>
            <div id="loaded">
                <div class="introduction">
                    <input type="file" id="file-input" @click="rotate" title=" ">

                    <p>
                        Upload an
                        <span class="secondary--text">audio file</span>
                    </p>
                    <!--TODO: add note that audio will be transcribed to 8 quantized time steps per quarter-->
                    <v-btn
                        outline
                        large
                        fab
                        color="primary"
                        class="uploadButton"
                        id="uploadButton"
                        tabindex="0"
                    >
                        <v-icon>add</v-icon>
                    </v-btn>
                </div>
            </div>

            <div class="visualizerLoader" id="visualizerLoader">
                <p>
                    Transcribing
                    <span class="secondary--text">{{fileName}}</span>
                    <br>
                    <span
                        class="cpuWarning"
                    >Please wait while your neural networks are hard at work!</span>
                </p>
            </div>
            <div class="canvasWrap" id="canvasWrap">
                <canvas id="canvas"></canvas>
                <transition name="fade">
                    <v-btn
                        v-if="playerHovered"
                        @mouseenter="playerHovered = true"
                        @mouseleave="playerHovered = false"
                        id="playButton"
                        fab
                        dark
                        large
                        color="primary"
                    >
                        <v-icon dark>
                            {{ //Nested ternaries are cool
                            ["unstarted", "paused", "done"].includes(this.playerState)
                            ? (this.playerState === "done" ? "replay" : "play_arrow")
                            : "pause"
                            }}
                        </v-icon>
                    </v-btn>
                </transition>
                <transition name="fade">
                    <p
                        v-if="playerHovered"
                        @mouseenter="playerHovered = true"
                        @mouseleave="playerHovered = false"
                    >{{fileName}}</p>
                </transition>
            </div>
        </div>
        <div class="control">
            <v-container>
                <v-layout>
                    <v-flex sm4>
                        <v-text-field
                            class="temperature"
                            v-model="temperature"
                            label="Temperature"
                            background-color="#2f3d46"
                            box
                        ></v-text-field>
                    </v-flex>
                    <v-flex sm3>
                        <v-text-field
                            class="steps"
                            v-model="steps"
                            label="Steps"
                            background-color="#2f3d46"
                            box
                        ></v-text-field>
                    </v-flex>
                    <v-flex sm3>
                        <v-btn outline color="primary">Generate Music!</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
import Loader from "./Loader";
import RangeInput from "./RangeInput";
import { setTimeout } from "timers";
import * as mm from "@magenta/music";

export default {
    name: "Transcribe",
    components: {
        Loader,
        RangeInput
    },
    data() {
        return {
            modelReady: false,
            transcriptionModel: null,
            generationModel: null,
            fileName: "",
            loader: null,
            noteSequence: null, //Transcribed music turned into magenta.js NS
            newNoteSequence: null,
            visualizer: null, //Draws noteSequence
            player: null, //Plays noteSequence
            canvasLoaded: false,
            playerHovered: false,
            playerState: "unstarted",
            audioDuration: "",
            rotated: 90,
            //Music generation options
            steps: 20,
            temperature: 10
        };
    },
    mounted: function() {
        this.transcriptionModel = new mm.OnsetsAndFrames(
            "https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni"
        );
        this.generationModel = new mm.MusicRNN(
            "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn"
        );
        this.transcriptionModel.initialize().then(() => {
            this.modelReady = true;
            this.initUI();
        });
    },
    methods: {
        initUI() {
            //Use timeout to smoothen load transition
            setTimeout(() => {
                Velocity(document.getElementById("loading"), {
                    opacity: 0,
                    display: "none"
                });
                setTimeout(() => {
                    Velocity(document.getElementById("loaded"), {
                        opacity: 1,
                        display: "block"
                    });
                }, 550);
            }, 100);
            //Handle audio input
            const fileInput = document.getElementById("file-input");
            fileInput.addEventListener("change", e => {
                this.transcribeFile(e.target.files[0]);
                this.fileName = e.target.files[0].name;
            });
        },
        async transcribeFile(file) {
            //Hard coded transition; can't use velocity in async (target for workaround fix)
            document.getElementById("loaded").style.display = "none";
            document.getElementById("loaded").style.opacity = "0";
            document.getElementById("visualizerLoader").style.display = "block";
            document.getElementById("visualizerLoader").style.opacity = "1";
            await this.transcriptionModel
                .transcribeFromAudioFile(file)
                .then(noteSequence => {
                    this.noteSequence = mm.sequences.quantizeNoteSequence(
                        noteSequence,
                        8
                    );

                    //Transition into canvas
                    Velocity(document.getElementById("visualizerLoader"), {
                        opacity: 0,
                        display: "none"
                    });
                    setTimeout(() => {
                        Velocity(document.getElementById("canvasWrap"), {
                            opacity: 1,
                            display: "block"
                        });
                    }, 500);

                    //Get properties
                    this.audioDuration = this.noteSequence.timeSignatures;

                    //Setup note visualizer
                    const config = {
                        noteHeight: 10,
                        pixelsPerTimeStep: 5,
                        noteSpacing: 2,
                        noteRGB: "234, 234, 236",
                        activeNoteRGB: "184, 54, 201"
                    };
                    this.visualizer = new mm.Visualizer(
                        this.noteSequence,
                        document.getElementById("canvas"),
                        config
                    );
                    this.canvasLoaded = true;
                    //Setup note player
                    this.player = new mm.Player();
                    this.player = new mm.SoundFontPlayer(
                        "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
                    );
                    this.player.loadSamples(this.noteSequence);
                    this.player.callbackObject = {
                        run: note => this.visualizer.redraw(note),
                        stop: () => {
                            console.log("done");
                            this.playerState = "done";
                        }
                    };
                });
        },
        togglePlayer() {
            //Handles clicks on the player depending on playerState
            if (this.canvasLoaded === true) {
                if (
                    //Player not started
                    this.playerState === "unstarted" ||
                    this.playerState === "done"
                ) {
                    this.player.resumeContext();
                    this.player.start(this.noteSequence);
                    this.playerState = "playing";
                } else if (this.playerState === "playing") {
                    //Player playing
                    this.player.pause();
                    this.playerState = "paused";
                } else if (this.playerState === "paused") {
                    //Player paused
                    this.player.resume();
                    this.playerState = "playing";
                }
            }
        },
        createMusic() {},
        rotate() {
            //Simple animation on upload button click
            document.getElementById("uploadButton").style.transform =
                "rotate(" + this.rotated.toString() + "deg)";
            this.rotated += 90;
        }
    }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.container {
    margin-top: 50px;
    width: 1000px;
    border-radius: 15px;
    padding: 0;
    .header {
        text-align: center;
        height: 80px;
        padding: 15px;
        p {
            font-size: 20px;
            margin-top: 8px;
            i {
                font-size: 28px;
            }
        }
    }
    .player {
        // background: #364c58;
        // background: #2b3f49;
        // background: #37474f;

        width: 100%;
        height: 300px;
        padding: 40px 0;
        position: relative;
        transition: 0.25s;
        &:hover {
            cursor: pointer;
        }

        #shader {
            width: 100%;
            height: 100%;
            margin-top: -40px;
            position: absolute;
            z-index: 2;
            background: rgba(45, 49, 53, 0.7);
        }
        #loading {
            text-align: center;
            margin-top: -40px;
            p {
                font-size: 16px;
                font-weight: 300;
                margin-top: -30px;
            }
        }

        #loaded {
            text-align: center;
            display: none;
            opacity: 0;
            div,
            p {
                margin: 20px;
            }
            .introduction {
                input[type="file"] {
                    margin-left: -450px;

                    z-index: 3;
                    opacity: 0;
                    width: 900px;
                    height: 300px;
                    margin-top: -60px;
                    position: absolute;
                    color: transparent;
                    font-size: 0;
                    &:hover {
                        cursor: pointer;
                    }
                }
                text-align: center;
                font-size: 20px;
                width: 60%;
                margin: auto;
                font-weight: 300;
                p {
                    font-size: 16px;
                    line-height: 5px;
                    padding-top: 20px;
                    font-weight: 300;
                }
                .uploadButton {
                    i {
                        font-size: 40px;
                        transform-origin: 50% 50%;
                        transition: 0.5s;
                    }
                }
            }
        }

        .visualizerLoader {
            text-align: center;
            display: none;
            p {
                font-size: 19px;
                margin-top: 65px;
                font-weight: 300;
                line-height: 35px;
                .cpuWarning {
                    font-size: 17px;
                    opacity: 0.8;
                    font-weight: 200;
                }
            }
        }
        .canvasWrap {
            width: 90%;
            height: 100%;
            margin: auto;
            display: none;
            opacity: 0;
            #canvas {
                display: block;
                width: 100% !important;
                image-rendering: pixelated;
                height: 100% !important;
                color: #764b7c;
            }

            #playButton {
                position: absolute;
                top: 100px;
                right: 47.5%;
                z-index: 100;
                // background: rgba(227, 66, 248, 0.1) !important;

                i {
                    font-size: 40px;
                }
            }
            p {
                position: absolute;
                bottom: 50px;
                width: 100%;
                margin-left: -50px;
                text-align: center;
                z-index: 100;
                font-size: 17px;
                font-weight: 200;
            }
        }
    }
    .control {
        .flex {
            align-items: center;
            margin: auto;
        }
        .temperature {
            width: 300px;
            margin: auto;
        }
        .steps {
            width: 200px;
            margin: auto;
        }
        .v-btn {
            width: 200px;
            margin: auto;
            height: 60px;
            margin-top: -25px;
        }
    }
}
</style>
