angular.module('ChallengeApp')
.controller('ProjectController', ProjectController);


ProjectController.$inject = ['ProjectService', 'DepartmentService', 'DeadlineService', 'ResourceService', '$stateParams'];

function ProjectController(ProjectService, DepartmentService, DeadlineService, ResourceService, $stateParams) {
	var self = this;
	self.entityType = 'Project';
	self.project = [];
	self.noDataClass = 'hidden';
	addProject();
	self.deleteProject = funcDeleteProject;

	function funcDeleteProject(id, name) {
		if(confirm('Are you sure you want to delete Project "' + name + '"? This action cannot be undone!')) {
			ProjectService.deleteEntity(id);
			self.project.length = 0;
			self.noDataClass = '';
		}
	}
	function addProject() {
		self.project.push(ProjectService.getById(parseInt($stateParams.id)));
	}
}