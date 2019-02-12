<template>
    <v-footer dark height="auto">
        <v-card flat tile class="lighten-1 white--text text-xs-center card" color="#2b4349">
            <v-card-text>
                <v-btn v-for="icon in icons" :key="icon" class="mx-3 primary--text" icon>
                    <v-icon size="24px">{{ icon }}</v-icon>
                </v-btn>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="copy">
                &copy;2019 —
                <span class="name">Kadin Zhang</span>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            icons: [
                "fab fa-github",
                "fab fa-google-plus",
                "fab fa-linkedin",
                "fab fa-instagram"
            ]
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
.name {
    font-weight: 300;
}
</style>

