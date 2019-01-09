<!--Credit Joe Harry @CodePen-->
<template>
    <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
    >
        <defs>
            <rect id="panel" x="158" y="231" width="500" height="138"></rect>
            <clipPath id="mainMask">
                <use xlink:href="#panel" fill="red"></use>
            </clipPath>

            <linearGradient
                id="draggerGrad"
                x1="120"
                y1="344"
                x2="158.26"
                y2="344"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stop-color="#0071bc" stop-opacity="0"></stop>
                <stop offset="1" stop-opacity="0.15"></stop>
            </linearGradient>
            <linearGradient
                id="panelGrad"
                gradientUnits="userSpaceOnUse"
                x1="158"
                y1="300"
                x2="658"
                y2="300"
            >
                <stop offset="0" stop-color="#0071bc" stop-opacity="0"></stop>
                <stop offset="1" stop-color="#f2f2f2" stop-opacity="0.5"></stop>
            </linearGradient>
            <clipPath id="panelMask">
                <use class="panelMask" xlink:href="#panel" x="-500" fill="red"></use>
            </clipPath>
        </defs>
        <use class="bgPanel" xlink:href="#panel" fill="#0071bc"></use>
        <use class="bgPanelCover" xlink:href="#panel" fill="#000" opacity="0.1"></use>

        <rect class="track" x="158" y="334" width="500" height="35" fill="#0071bc"></rect>
        <g class="iconGroup" transform="translate(20, 0)">
            <g class="iconRing">
                <circle cx="208.5" cy="281.5" r="35" fill="#fffcf9" opacity="0.5"></circle>
                <circle class="iconFill" cx="208.5" cy="281.5" r="29.75" fill="#0071bc"></circle>
            </g>
            <path
                class="icon"
                d="M208.63,267.13c1.34,2,2.67,3.78,3.91,5.45,3.83,5.21,6.86,9.33,6.86,13.3a10.78,10.78,0,0,1-21.55,0c0-3.95,3-8,6.81-13.2C205.91,271,207.27,269.13,208.63,267.13Z"
                fill="#FFFCF9"
                fill-rule="evenodd"
            ></path>
        </g>

        <!-- <path d="M267,341H250V320h17Z" fill="#FFFCF9"/> -->
        <g clip-path="url(#mainMask)">
            <g clip-path="url(#panelMask)">
                <use class="gradPanel" xlink:href="#panel" y="103" fill="url(#panelGrad)"></use>
            </g>
            <rect
                class="draggerShadow"
                x="125"
                y="334"
                width="34"
                height="35"
                fill="url(#draggerGrad)"
            ></rect>
            <text x="290" y="294" class="sliderProp sliderLabel">Tint</text>
            <rect class="dragger" x="158" y="334" width="30" height="35" fill="#FFFCF9"></rect>
            <text x="45%" y="400" class="valueProp sliderLabel">0%</text>
        </g>
    </svg>
</template>

<script>
import { TweenMax } from "gsap/TweenMax";

export default {
    name: "RangeInput",
    mounted: function() {
        var xmlns = "http://www.w3.org/2000/svg",
            xlinkns = "http://www.w3.org/1999/xlink",
            select = function(s) {
                return document.querySelector(s);
            },
            selectAll = function(s) {
                return document.querySelectorAll(s);
            },
            onPressTl = new TimelineMax({ paused: true }).timeScale(1.42),
            onReleaseTl = new TimelineMax({ paused: true }).timeScale(1.72),
            tintTl = new TimelineMax({ paused: true }),
            menuPos = { y: 0 },
            sliderPos = 0,
            maxDragPosX = 470,
            dragger = select(".dragger"),
            draggerShadow = select(".draggerShadow"),
            track = select(".track"),
            iconFill = select(".iconFill"),
            panelMask = select(".panelMask"),
            gradPanel = select(".gradPanel"),
            iconRing = select(".iconRing"),
            iconGroup = select(".iconGroup"),
            bgPanel = select(".bgPanel"),
            valueProp = select(".valueProp"),
            draggerPos = TweenMax.set(".dragger", {
                x: "+=0"
            }).target[0]._gsTransform;

        TweenMax.set("svg", {
            visibility: "visible"
        });

        onPressTl
            .to([dragger, draggerShadow, ".track"], 0.6, {
                attr: {
                    height: 138
                },
                y: -103,
                ease: Elastic.easeOut.config(0.3, 0.9)
            })
            .staggerTo(
                [".sliderProp", ".valueProp"],
                0.6,
                {
                    cycle: {
                        y: [-71, -84]
                    },
                    ease: Elastic.easeOut.config(0.3, 0.9)
                },
                0.05,
                0
            )
            .to(
                ".iconGroup",
                0.4,
                {
                    y: 18,
                    //scale:1.2,
                    transformOrigin: "50% 50%",
                    ease: Elastic.easeOut.config(0.3, 0.9)
                },
                0
            )
            .to(
                ".icon",
                1,
                {
                    scale: 1.42,
                    transformOrigin: "50% 50%",
                    ease: Elastic.easeOut.config(0.8, 0.29)
                },
                0
            )

            .to(
                iconRing,
                0.02,
                {
                    alpha: 0
                },
                0
            )

            .to(
                gradPanel,
                0.6,
                {
                    attr: {
                        y: 0
                    },
                    ease: Elastic.easeOut.config(0.3, 0.9)
                },
                0
            );

        onReleaseTl
            .to([dragger, draggerShadow, ".track"], 0.3, {
                attr: {
                    height: 35
                },
                y: 0
            })
            .to(
                [".sliderProp", ".valueProp"],
                0.6,
                {
                    y: -0,
                    ease: Elastic.easeOut.config(0.3, 0.9)
                },
                "-=0.3"
            )
            .to(
                ".iconGroup",
                0.4,
                {
                    y: 0,
                    scale: 1,
                    ease: Elastic.easeOut.config(0.3, 0.9)
                },
                0
            )
            .to(
                iconRing,
                0.4,
                {
                    alpha: 1
                },
                0
            )
            .to(
                gradPanel,
                0.3,
                {
                    attr: {
                        y: 103
                    }
                },
                0
            )
            .to(
                ".icon",
                1,
                {
                    scale: 1,
                    transformOrigin: "50% 50%",
                    ease: Elastic.easeOut.config(0.8, 0.29)
                },
                0
            );

        tintTl.to([bgPanel, track, iconFill], 1, {
            fill: "#DF2548",
            ease: Linear.easeNone
        });

        function onPress() {
            onReleaseTl.kill();
            onPressTl.play(0);
        }
        function onRelease() {
            onPressTl.kill();

            console.log(track.style.fill);
            onReleaseTl.play(0);
        }

        function onDragUpdate() {
            sliderPos = dragger._gsTransform.x / maxDragPosX;
            valueProp.textContent = ~~(sliderPos * 100) + "%";

            TweenMax.set([draggerShadow, panelMask], {
                x: dragger._gsTransform.x
            });

            tintTl.progress(sliderPos);
        }
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        function rgbToHex(r, g, b) {
            return (
                "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
            );
        }
        Draggable.create(dragger, {
            type: "x",
            bounds: { minX: 0, maxX: maxDragPosX },
            onPress: onPress,
            onRelease: onRelease,
            onDrag: onDragUpdate,
            throwProps: true,
            onThrowUpdate: onDragUpdate,
            overshootTolerance: 0
        });

        var tl = new TimelineMax();
    }
};
</script>

<style lang="scss" scoped>
svg {
    width: 800px;
    height: 600px;
    // visibility: hidden;
    z-index: 500;
    position: absolute;
}

.sliderLabel {
    text-anchor: start;
    fill: #fffcf9;
    font-family: "Questrial", serif;
    font-size: 27px;
    letter-spacing: 0.3px;
    user-select: none;
    -moz-user-select: none;
}

.valueProp {
    text-anchor: start;
    fill: #fffcf9;
    font-size: 44px;
}

.dragger {
    -webkit-tap-highlight-color: transparent;
}
</style>
