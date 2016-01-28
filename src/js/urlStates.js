angular.module('ChallengeApp')
.config(indexStates);


indexStates.$inject = ['$stateProvider', '$urlRouterProvider'];

function indexStates($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'home.html',
		controller: ''
	})
	.state('projects', {
		url: '/projects',
		templateUrl: 'projects.html',
		controller: 'ProjectController as projectCtl',
		resolve: {
			//postPromise: postsServiceWrapper
		}
	})
	/*.state('posts', {
	  url: '/posts/{id}',
	  templateUrl: 'posts.html',
	  controller: 'postsController as postsCtrl'
	})*/
	;
	$urlRouterProvider.otherwise('/home');


}