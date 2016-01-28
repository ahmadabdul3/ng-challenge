angular.module('ChallengeApp')
.controller('ProjectsController', ProjectsController);


ProjectsController.$inject = ['ProjectService', 
'DepartmentService', 
'DeadlineService', 
'ResourceService', 
'NewProjectService', 
'totalResourcesClass', 
'resourceListClass',
'mainLink',
'mainLinkName',
'orderBy' ];

function ProjectsController(ProjectService, 
	DepartmentService, 
	DeadlineService, 
	ResourceService, 
	NewProjectService, 
	totalResourcesClass, 
	resourceListClass,
	mainLink,
	mainLinkName,
	orderBy) {

	var self = this;
	self.projects = ProjectService.getAll();
	self.deleteProject = funcDeleteProject;

	self.mainLink = mainLink;
	self.mainLinkName = mainLinkName;
	self.orderBy = orderBy;
	self.totalResourcesClass = totalResourcesClass;
	self.resourceListClass = resourceListClass;
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

	function funcDeleteProject(id, name) {
		if(confirm('Are you sure you want to delete Project "' + name + '"? This action cannot be undone!')) {
			ProjectService.deleteEntity(id);
		}
	}
}