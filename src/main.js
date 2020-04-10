import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

// Old Theme
// Vue.use(Vuetify, {
// 	theme: {
// 		primary: '#952aa3',
// 		secondary: '#e946ff',
// 		accent: '#303747',
// 		background: '#304049',
// 		secondaryBackground: '#27343b',
// 		error: '#ff643d',
// 	},
// });

Vue.use(Vuetify, {
	theme: {
		primary: '#c484b2',
		secondary: '#c484b2',
		accent: '#303747',
		background: '#c9c7c7',
		secondaryBackground: '#523a4b',
		error: '#ff643d',
	},
});

new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
