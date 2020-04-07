<template>
    <div class="text">
        <p>iii &#8250; iv &#8250;</p>
        <p>
            <span class="word wisteria">ii &#8250; V</span>
            <span class="word belize">wonderful.</span>
            <span class="word pomegranate">fancy.</span>
            <span class="word green">beautiful.</span>
            <span class="word midnight">cheap.</span>
        </p>
    </div>
</template>

<script>
export default {
    name: "ProgressionSVG",
    data() {
        return {
            words: document.getElementsByClassName("word"),
            wordArray: [],
            currentWord: 0
        };
    },
    methods: {
        changeWord() {
            var cw = this.wordArray[this.currentWord];
            var nw =
                this.currentWord == words.length - 1
                    ? this.wordArray[0]
                    : this.wordArray[this.currentWord + 1];
            for (var i = 0; i < cw.length; i++) {
                animateLetterOut(cw, i);
            }

            for (var i = 0; i < nw.length; i++) {
                nw[i].className = "letter behind";
                nw[0].parentElement.style.opacity = 1;
                animateLetterIn(nw, i);
            }

            this.currentWord =
                this.currentWord == this.wordArray.length - 1
                    ? 0
                    : this.currentWord + 1;
        },

        animateLetterOut(cw, i) {
            setTimeout(function() {
                cw[i].className = "letter out";
            }, i * 80);
        },

        animateLetterIn(nw, i) {
            setTimeout(function() {
                nw[i].className = "letter in";
            }, 340 + i * 80);
        },

        splitLetters(word) {
            var content = word.innerHTML;
            word.innerHTML = "";
            var letters = [];
            for (var i = 0; i < content.length; i++) {
                var letter = document.createElement("span");
                letter.className = "letter";
                letter.innerHTML = content.charAt(i);
                word.appendChild(letter);
                letters.push(letter);
            }

            this.wordArray.push(letters);
        }
    },
    mounted() {
        this.words[this.currentWord].style.opacity = 1;
        for (var i = 0; i < this.words.length; i++) {
            splitLetters(this.words[i]);
        }

        changeWord();
        setInterval(changeWord, 4000);
    }
};
</script>

<style lang="scss" scoped>
body {
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 40px;
}

.text {
    position: absolute;
    width: 450px;
    left: 50%;
    margin-left: -225px;
    height: 40px;
    top: 50%;
    margin-top: -20px;
}

p {
    display: inline-block;
    vertical-align: top;
    margin: 0;
}

.word {
    position: absolute;
    width: 220px;
    opacity: 0;
}

.letter {
    display: inline-block;
    position: relative;
    float: left;
    transform: translateZ(25px);
    transform-origin: 50% 50% 25px;
}

.letter.out {
    transform: rotateX(90deg);
    transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.letter.behind {
    transform: rotateX(-90deg);
}

.letter.in {
    transform: rotateX(0deg);
    transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.wisteria {
    color: #8e44ad;
}

.belize {
    color: #2980b9;
}

.pomegranate {
    color: #c0392b;
}

.green {
    color: #83677b;
}

.midnight {
    color: #2c3e50;
}
</style>