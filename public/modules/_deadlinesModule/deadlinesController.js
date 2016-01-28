angular.module('ChallengeApp')
.controller('DeadlineController', DeadlineController);

DeadlineController.$inject = ['DeadlineService', 'ProjectService', 'NewDeadlineService', 'totalResourcesClass', 'resourceListClass', 'mainLink', 'mainLinkName'];

function DeadlineController(DeadlineService, ProjectService, NewDeadlineService, totalResourcesClass, resourceListClass, mainLink, mainLinkName) {
	console.log('dept');
	var self = this;
	self.deadlines = DeadlineService.getAll();
	setUpDeadlines();
	self.mainLink = mainLink;
	self.mainLinkName = mainLinkName;
	self.newDeadline = NewDeadlineService.newDeadline;
	self.entityType = 'Deadline';
	self.totalResourcesClass = totalResourcesClass;
	self.resourceListClass = resourceListClass;
	self.deleteDeadline = funcDeleteDeadline;
	self.getDeadlineProjects = getDeadlineProjects;
	self.showNewDeadlineForm = funcShowNewDeadlineForm;
	self.addNewDeadline = NewDeadlineService.addNewDeadline;
	self.validateNewDeadline = NewDeadlineService.validateNewDeadline;
	self.cancelAddNewDeadline = NewDeadlineService.cancelAddNewDeadline;

	var entityType = 'Deadline';


	function funcDeleteDeadline(id, name) {
		if(confirm('Are you sure you want to delete ' + entityType + ' "' + name + '"? This action cannot be undone!')) {
			var result = DeadlineService.tryDelete(id);
			if(result.isSuccessful) DeadlineService.deleteEntity(id);
			else alert(result.message);
		}
	}
	function getDeadlineProjects(deadline, idList) {
		return ProjectService.getByIdList(idList);
	}
	
	function funcShowNewDeadlineForm() {
		$('.add-project-modal').fadeIn();
	}
	function funcHideNewDeadlineForm(callback) {
		$('.add-project-modal').fadeOut(300, callback);
	}
	function setUpDeadlines() {
		var length = self.deadlines.length;
		for(var i = 0; i < length; i++) {
			var item = self.deadlines[i];
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

