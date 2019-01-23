import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
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
		primary: '#34c9b2',
		secondary: '#3ff9dc',
		accent: '#303747',
		background: '#37474f',
		secondaryBackground: '#29363d',
		error: '#ff643d',
	},
});

new Vue({
	render: h => h(App),
}).$mount('#app');
