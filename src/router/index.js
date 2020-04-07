import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Transcribe from '@/components/Transcribe';

Vue.use(Router);

export default new Router({
	// base: '/demos/mh-portfolio-vuejs-and-gsap-template/', // --> IF WEBAPP IN SUBFOLDER THEN path/to/subfolder
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			meta: {
				title: 'MusicTheory.ai',
			},
		},
		{
			path: '/app',
			name: 'Transcribe',
			component: Transcribe,
			meta: {
				title: 'MusicTheory.ai',
			},
		},
	],
});
