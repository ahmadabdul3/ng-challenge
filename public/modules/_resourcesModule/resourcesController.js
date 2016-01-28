angular.module('ChallengeApp')
.controller('ResourcesController', ResourcesController);


ResourcesController.$inject = ['ResourceService', 'ProjectService', 'NewResourceService'];

function ResourcesController(ResourceService, ProjectService, NewResourceService) {
	console.log('dept');
	var self = this;
	self.resources = ResourceService.getAll();
	setUpResources();
	self.newResource = NewResourceService.newResource;
	self.entityType = 'Resource';
	
	self.deleteResource = funcDeleteResource;
	self.getResourceProjects = getResourceProjects;
	self.showNewResourceForm = funcShowNewResourceForm;
	self.addNewResource = NewResourceService.addNewResource;
	self.validateNewResource = NewResourceService.validateNewResource;
	self.cancelAddNewResource = NewResourceService.cancelAddNewResource;

	var entityType = 'Resource';


	function funcDeleteResource(id, name) {
		if(confirm('Are you sure you want to delete ' + entityType + ' "' + name + '"? This action cannot be undone!')) {
			var result = ResourceService.tryDelete(id);
			if(result.isSuccessful) ResourceService.deleteEntity(id);
			else alert(result.message);
		}
	}
	function getResourceProjects(resource, idList) {
		return ProjectService.getByIdList(idList);
	}
	
	function funcShowNewResourceForm() {
		$('.add-project-modal').fadeIn();
	}
	function funcHideNewResourceForm(callback) {
		$('.add-project-modal').fadeOut(300, callback);
	}
	function setUpResources() {
		var length = self.resources.length;
		for(var i = 0; i < length; i++) {
			var item = self.resources[i];
			if(typeof item.projects === 'undefined') {
				item.projects = funcGetProjectsByObjectList(item.refs.projects);
			}
		}
	}
	function funcGetProjectsByObjectList(list) {
		return function() {
			return ProjectService.getByObjectList(list); 
		}
	}

}

