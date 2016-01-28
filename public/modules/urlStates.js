angular.module('ChallengeApp')
.config(indexStates);


indexStates.$inject = ['$stateProvider', '$urlRouterProvider'];

function indexStates($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'modules/_departmentsModule/views/Departments.html',
		controller: 'DepartmentController as deptCtl'
	})
	.state('projects', {
		url: '/projects',
		templateUrl: 'modules/_projectsModule/views/projects.html',
		controller: 'ProjectsController as projectCtl',
		resolve: {
			totalResourcesClass: function() { return 'hidden'; },
			resourceListClass: function() { return ''; },
			orderBy: function() { return 'name'; },
			mainLink: function() { return '#/projects/resources'; },
			mainLinkName: function() { return 'Project Resources'; }
		}
	})
	.state('projectsResourceCount', {
		url: '/projects/resources',
		templateUrl: 'modules/_projectsModule/views/projects.html',
		controller: 'ProjectsController as projectCtl',
		resolve: {
			totalResourcesClass: function() { return ''; },
			resourceListClass: function() { return 'hidden'; },
			orderBy: function() { return 'resourceLength'; },
			mainLink: function() { return '#/projects'; },
			mainLinkName: function() { return 'Projects'; }
		}
	})
	.state('departments', {
		url: '/departments',
		templateUrl: 'modules/_departmentsModule/views/Departments.html',
		controller: 'DepartmentController as deptCtl'
	})
	.state('project', {
		url: '/project/{id}',
		templateUrl: 'modules/_projectsModule/views/project.html',
		controller: 'ProjectController as projectCtl'
	})
	.state('deadlines', {
		url: '/deadlines',
		templateUrl: 'modules/_deadlinesModule/views/deadlines.html',
		controller: 'DeadlineController as deadCtl',
		resolve: {
			totalResourcesClass: function() { return 'hidden'; },
			resourceListClass: function() { return ''; },
			mainLink: function() { return '#/deadlines/resources'; },
			mainLinkName: function() { return 'Deadline Resources'; }
		}
	})
	.state('deadlinesResources', {
		url: '/deadlines/resources',
		templateUrl: 'modules/_resourcesModule/views/deadlines.html',
		controller: 'DeadlineController as deadCtl',
		resolve: {
			totalResourcesClass: function() { return ''; },
			resourceListClass: function() { return 'hidden'; },
			mainLink: function() { return '#/deadlines'; },
			mainLinkName: function() { return 'Deadlines'; }
		}
	})
	.state('resources', {
		url: '/resources',
		templateUrl: 'modules/_resourcesModule/views/resources.html',
		controller: 'ResourcesController as resourceCtl'
	})
	;
	$urlRouterProvider.otherwise('/home');


}