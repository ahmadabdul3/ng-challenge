angular.module('ChallengeApp')
.controller('ProjectController', ProjectController);


ProjectController.$inject = ['ProjectService', 'DepartmentService', 'DeadlineService', 'ResourceService', 'NewProjectService'];

function ProjectController(ProjectService, DepartmentService, DeadlineService, ResourceService, NewProjectService) {
	var self = this;
	self.projects = ProjectService.getAll();
	self.deleteProject = funcDeleteProject;
	self.getProjectDepartment = funcGetProjectDepartment;
	self.getProjectDeadline = funcGetProjectDeadline;
	self.getProjectResources = funcGetProjectResources;

	self.newProject = NewProjectService.newProject;
	self.addNewProject = NewProjectService.addNewProject;
	self.showNewProjectForm = NewProjectService.showNewProjectForm;
	self.hideNewProjectForm = NewProjectService.hideNewProjectForm;
	self.cancelAddNewProject = NewProjectService.cancelAddNewProject;
	self.addResourceId = NewProjectService.addResourceId;
	self.deleteTempResourceItem = NewProjectService.deleteTempResourceItem;
	self.addResourceName = NewProjectService.addResourceName;
	self.validateNewProject = NewProjectService.validateNewProject;
	self.validateDepartment = NewProjectService.validateDepartment;
	self.validateDeadline = NewProjectService.validateDeadline;
	self.validateResource = NewProjectService.validateResource;
	self.clearNewProjectDepartmentId = NewProjectService.clearNewProjectDepartmentId;
	self.clearNewProjectDeadlineId = NewProjectService.clearNewProjectDeadlineId;
	self.clearNewProjectSelectedResource = NewProjectService.clearNewProjectSelectedResource;
	self.clearNewProjectDepartment = NewProjectService.clearNewProjectDepartment;
	self.clearNewProjectDeadline = NewProjectService.clearNewProjectDeadline;
	self.clearNewProjectResource = NewProjectService.clearNewProjectResource;


	function funcGetProjectDepartment(id) {
		return DepartmentService.getById(id);
	}
	function funcGetProjectDeadline(id) {
		return DeadlineService.getById(id);
	}
	function funcGetProjectResources(idList) {
		return ResourceService.getByIdList(idList);
	}

	function funcDeleteProject(id, name) {
		if(confirm('Are you sure you want to delete Project "' + name + '"? This action cannot be undone!')) {
			ProjectService.delete(id);
		}
	}
	

}