<template>
    <div class="container">
        <div class="header">
            <p>
                <span>
                    <v-icon color="purple">queue_music</v-icon>
                </span>MusicTheory.ai
            </p>
        </div>
        <div class="player" id="player" v-ripple @click="togglePlayer">
            <div id="shader"></div>
            <div id="loading">
                <div class="musicLoader">
                    <Loader/>
                </div>
                <p>Loading Model..</p>
            </div>

            <div id="loaded">
                <div class="introduction">
                    <p>
                        Upload an
                        <span>audio file</span>
                    </p>

                    <v-btn
                        outline
                        large
                        fab
                        color="primary"
                        class="uploadButton"
                        id="uploadButton"
                        tabindex="0"
                        @click="rotate"
                    >
                        <v-icon>add</v-icon>
                        <div class="inputWrapper">
                            <input type="file" id="file-input">
                        </div>
                    </v-btn>
                </div>
            </div>

            <div class="visualizerLoader" id="visualizerLoader">
                <p>
                    Transcribing
                    <span class="fileName">{{fileName}}...</span>
                    <br>
                    <span
                        class="cpuWarning"
                    >Please wait while your neural networks are hard at work!</span>
                </p>
            </div>
            <div class="canvasWrap" id="canvasWrap">
                <canvas id="canvas"></canvas>
                <v-btn id="playButton" fab dark large outline color="primary">
                    <v-icon dark>play_arrow</v-icon>
                </v-btn>
            </div>
        </div>
        <p>{{playerState}}</p>
    </div>
</template>

<script>
import Loader from "./Loader";
import { setTimeout } from "timers";

export default {
    name: "Transcribe",
    components: {
        Loader
    },
    data() {
        return {
            modelReady: false,
            model: null,
            fileName: "",
            loader: null,
            noteSequence: null, //Transcribed music turned into magenta.js NS
            visualizer: null, //Draws noteSequence
            player: null, //Plays noteSequence
            playerState: "unstarted",
            rotated: 90
        };
    },
    mounted: function() {
        this.model = new mm.OnsetsAndFrames(
            "https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni"
        );
        this.model.initialize().then(() => {
            this.modelReady = true;
            this.initUI();
        });
    },
    methods: {
        initUI() {
            //Use timeout to smoothen load transition
            setTimeout(() => {
                Velocity(
                    document.getElementById("loading"),
                    { opacity: 0 },
                    { display: "none" }
                );
                setTimeout(() => {
                    Velocity(
                        document.getElementById("loaded"),
                        { opacity: 1 },
                        { display: "block" }
                    );
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
            await this.model
                .transcribeFromAudioFile(file)
                .then(noteSequence => {
                    //Transition into canvas
                    Velocity(
                        document.getElementById("visualizerLoader"),
                        { opacity: 0 },
                        { display: "none" }
                    );
                    setTimeout(() => {
                        Velocity(
                            document.getElementById("canvasWrap"),
                            { opacity: 1 },
                            { display: "block" }
                        );
                        setTimeout(() => {
                            Velocity(
                                document.getElementById("playButton"),
                                { opacity: 1 },
                                { duration: 300 }
                            );
                            Velocity(
                                document.getElementById("shader"),
                                { opacity: 0.2 },
                                { display: "block" }
                            );
                        }, 200);
                    }, 500);

                    //Setup note visualizer
                    const config = {
                        noteHeight: 8,
                        pixelsPerTimeStep: 5,
                        noteSpacing: 1,
                        noteRGB: "234, 234, 236",
                        activeNoteRGB: "118,75,124"
                    };
                    this.visualizer = new mm.Visualizer(
                        noteSequence,
                        document.getElementById("canvas"),
                        config
                    );
                    //Setup note player
                    this.player = new mm.SoundFontPlayer(
                        "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
                    );
                    this.player.callbackObject = {
                        run: note => this.visualizer.redraw(note),
                        stop: () => {
                            console.log("done");
                            // Velocity(
                            //     document.getElementById("player"),
                            //     { backgroundColor: "#283a44" },
                            //     { duration: 250 }
                            // );
                            // Velocity(
                            //     document.getElementById("playButton"),
                            //     { opacity: 1 },
                            //     { duration: 300 }
                            // );
                        }
                    };
                    this.noteSequence = noteSequence;
                });
        },
        async togglePlayer() {
            if (this.playerState === "unstarted") {
                this.player.loadSamples(this.noteSequence).then(() => {
                    this.player.start(this.noteSequence);
                });

                this.playerState = "playing";
            } else if (this.playerState === "playing") {
                this.player.pause();
                this.playerState = "paused";
            } else {
                this.player.resume();
                this.playerState = "playing";
            }
        },
        playNS() {
            //Play music (NS = Note Sequence)
            this.isPlaying = true;
            if (this.isPaused === true) {
                this.player.resume();
            } else {
                this.player.start(this.noteSequence);
            }
            Velocity(
                document.getElementById("playButton"),
                { opacity: 0 },
                { duration: 300 }
            );
            Velocity(
                document.getElementById("shader"),
                { opacity: 0 },
                { display: "none" }
            );
            Velocity(
                document.getElementById("player"),
                { backgroundColor: "#2b3f49" },
                { duration: 250 }
            );
        },
        pauseNS() {
            //Pause music
            this.player.stop();
            this.isPlaying = false;
            this.isPaused = true;
        },
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
.container {
    background: #22313a;
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
        background: #283a44;
        // background: #2b3f49;

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
            display: none;
            opacity: 0;
            background: #232f36;
        }
        #loading {
            text-align: center;
            margin-top: -40px;
            p {
                font-size: 16px;
                font-weight: 300;
                margin-top: -30px;
                opacity: 0.8;
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
                text-align: center;
                font-size: 20px;
                width: 60%;
                margin: auto;
                font-weight: 300;
                p {
                    font-size: 16px;
                    opacity: 0.8;
                    line-height: 5px;
                    padding-top: 20px;
                    font-weight: 300;
                    span {
                        color: #e342f8;
                    }
                }
                .uploadButton {
                    i {
                        font-size: 40px;
                        margin-top: -35px;
                        padding-top: 15px;
                        height: 70px;
                        transform-origin: 50% 50%;
                        transition: 0.5s;
                    }
                    .inputWrapper {
                        width: 72px;
                        height: 72px;
                        margin-top: -35px;
                        margin-left: 0px;
                        border-radius: 50%;
                        display: block;
                        z-index: 2;
                        input[type="file"] {
                            margin-top: 0px;
                            margin-left: -35px;
                            opacity: 0;
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            color: transparent;
                            font-size: 0;
                            &:hover {
                                cursor: pointer;
                            }
                        }
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
                .fileName {
                    color: #8c363f;
                    color: #952aa3;
                }
                .cpuWarning {
                    font-size: 17px;
                    opacity: 0.7;
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
                opacity: 0;
                z-index: 3;
                background: rgba(227, 66, 248, 0.05) !important;
                transition: box-shadow 0.3s;

                i {
                    font-size: 40px;
                }
            }
        }
    }
}
</style>
