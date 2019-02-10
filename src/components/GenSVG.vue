<template>
    <div class="holder">
        <div class="flying-notes">
            <div class="note note-schema">
                <svg
                    width="144px"
                    height="160px"
                    viewBox="0 0 144 160"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="music" fill="#333333">
                            <polygon
                                id="Shape"
                                points="56 36 124 24 124 116 144 116 144 0 36 20 36 136 56 136"
                            ></polygon>
                            <path
                                d="M56,136 C56,149.254 43.469,160 28,160 C12.531,160 0,149.254 0,136 C0,122.746 12.531,112 28,112 C43.469,112 56,122.746 56,136 Z"
                                id="Shape"
                            ></path>
                            <path
                                d="M144,116 C144,129.254 131.469,140 116,140 C100.531,140 88,129.254 88,116 C88,102.746 100.531,92 116,92 C131.469,92 144,102.746 144,116 Z"
                                id="Shape"
                            ></path>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GenSVG",
    data() {
        return {};
    },
    mounted: () => {
        var acAnimated = { Plugins: {} };
        acAnimated.Plugins.AddObjects = function(element, noteSchema) {
            for (var i = 0; i <= 10 - 1; i++) {
                //set count in css too for number of elements
                var note = document.createElement("div");
                note.className = "note note" + String(i + 1);
                note.innerHTML = noteSchema;
                element.appendChild(note);
            }
        };
        acAnimated.Plugins.AddObjects(
            document.body.querySelector(".flying-notes"),
            document.body.querySelector(".note-schema").innerHTML
        );
    }
};
</script>

<style lang="scss" scoped>
$noteWidth: 100;
$noteHeight: 100;
$throwDistanceX: 50;
$throwDistanceLeft: 0; //Set horizontal direction.
$throwDistanceY: 60;
$throwDistanceTop: -30; //Set vertical direction.
$count: 10; //set in JS for number of elements
$wobbleStrength: 10;

.holder {
    position: absolute;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: #ebe5df;
}
.flying-notes {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
.flying-notes .note {
    position: relative;
    left: 0%;
    top: 0%;
    width: $noteWidth + px;
    height: $noteHeight + px;
    animation: wobble 1s infinite;
    transform-origin: 50% 100%;
}
@keyframes wobble {
    0% {
        transform: rotateZ(0deg);
    }
    10% {
        transform: rotateZ((0 - $wobbleStrength) + deg);
    }
    20% {
        transform: rotateZ((0 + $wobbleStrength) + deg);
    }
    30% {
        transform: rotateZ((0 - ($wobbleStrength / 2)) + deg);
    }
    40% {
        transform: rotateZ((0 + ($wobbleStrength / 2)) + deg);
    }
    50% {
        transform: rotateZ((0 - ($wobbleStrength / 3)) + deg);
    }
    60% {
        transform: rotateZ((0 + ($wobbleStrength / 3)) + deg);
    }
    70% {
        transform: rotateZ((0 - ($wobbleStrength / 4)) + deg);
    }
    80% {
        transform: rotateZ((0 + ($wobbleStrength / 4)) + deg);
    }
    90% {
        transform: rotateZ((0 - ($wobbleStrength / 5)) + deg);
    }
    100% {
        transform: rotateZ(0deg);
    }
}
.flying-notes .note svg {
    width: 100%;
    height: 100%;
}
@for $i from 1 through $count {
    .flying-notes .note.note#{$i} {
        position: absolute;
        opacity: 0;
        width: $noteWidth + px;
        animation: note + $i 5.7s infinite linear;
        animation-delay: (($i - 1) * 1) + s;
    }
    $width: (($noteWidth / 4) + random(round($noteWidth / 4)));
    $left: round((random($throwDistanceX) - ($throwDistanceX / 2))) +
        (($noteWidth / 2) - random($noteWidth)) +
        $throwDistanceLeft;
    $top: (
            round((random($throwDistanceY) - ($throwDistanceY / 2))) +
                (($noteWidth / 2) - random($noteWidth))
        ) +
        $throwDistanceTop;
    @keyframes note#{$i} {
        0% {
            left: 0px;
            top: 0px;
            opacity: 0;
            transform: rotateY(0deg);
        }
        20% {
            left: $left + px;
            top: $top + px;
            opacity: 0.8;
            transform: rotateY(720deg);
            width: $width + px;
        }
        35% {
            left: $left + px;
            top: $top + px;
            opacity: 0;
            transform: rotateY(1080deg);
            width: $width + px;
        }
        100% {
            left: $left + px;
            top: $top + px;
            opacity: 0;
            transform: rotateY(0deg);
        }
    }
}
</style>