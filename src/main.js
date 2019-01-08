import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

//#3ff9dc
//#952aa3
Vue.use(Vuetify, {
	theme: {
		primary: '#952aa3',
		secondary: '#e946ff',
		accent: '#303747',
		background: '#2b3f49',
		secondaryBackground: '#22313a',
		error: '#ff643d',
	},
});

new Vue({
	render: h => h(App),
}).$mount('#app');
