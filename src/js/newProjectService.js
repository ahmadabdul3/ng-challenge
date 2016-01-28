angular.module('ChallengeApp')
.service('NewProjectService', NewProjectService);

NewProjectService.$inject = ['DepartmentService', 'DeadlineService', 'ResourceService', 'ProjectService'];

function NewProjectService(DepartmentService, DeadlineService, ResourceService, ProjectService) {
	var self = this;
	self.newProject = {
		name: '',
		errorMessage: '',
		newProjectClass: '',
		department: '',
		departmentId: '',
		departmentErrorMessage: '',
		departmentClass: '',
		deadline: '',
		deadlineId: '',
		deadlineErrorMessage: '',
		deadlineClass: '',
		resource: '',
		//resourceId: '',
		resourceErrorMessage: '',
		resourceClass: '',
		addErrorMessage: '',
		selectedResource: '',
		tempResourceIdNameList: [],
		resourceIdList: [],
		resourceNameList: [],
		departmentList: DepartmentService.getAll(),
		deadlineList: DeadlineService.getAll(),
		resourceList: ResourceService.getAll()
	};

	self.addNewProject = funcAddNewProject;
	self.showNewProjectForm = funcShowNewProjectForm;
	self.hideNewProjectForm = funcHideNewProjectForm;
	self.cancelAddNewProject = funcCancelAddNewProject;
	self.addResourceId = funcAddResourceId;
	self.deleteTempResourceItem = funcDeleteTempResourceItem;
	self.addResourceName = funcAddResourceName;
	self.validateNewProject = funcValidateNewProject;
	self.validateDepartment = funcValidateDepartment;
	self.validateDeadline = funcValidateDeadline;
	self.validateResource = funcValidateResource;
	self.clearNewProjectDepartmentId = funcClearNewProjectDepartmentId;
	self.clearNewProjectDeadlineId = funcClearNewProjectDeadlineId;
	self.clearNewProjectSelectedResource = funcClearNewProjectSelectedResource;
	self.clearNewProjectDepartment = funcClearNewProjectDepartment;
	self.clearNewProjectDeadline = funcClearNewProjectDeadline;
	self.clearNewProjectResource = funcClearNewProjectResource;

	function funcDeleteTempResourceItem(index, resource) {
		self.newProject.tempResourceIdNameList.splice(index, 1);
		var resourceIdListLength = self.newProject.resourceIdList.length;
		var resourceNameListLength = self.newProject.resourceNameList.length;
		for(var i = 0; i < resourceIdListLength; i++) {
			var item = self.newProject.resourceIdList[i];
			if(item === resource.id) {
				self.newProject.resourceIdList.splice(i, 1);
				break;
			}
		}
		for(var j = 0; j < resourceNameListLength; j++) {
			var item = self.newProject.resourceNameList[j];
			if(item === resource.name) {
				self.newProject.resourceNameList.splice(j, 1);
				break;
			}
		}
	}

	function funcAddResourceId() {
		if(self.newProject.selectedResource && self.newProject.selectedResource !== '') {
			var length = self.newProject.resourceIdList.length;
			for(var i = 0; i < length; i++) {
				var item = self.newProject.resourceIdList[i];
				if(item && item === self.newProject.selectedResource.id) {
					self.newProject.resourceErrorMessage = 'That Resource was already added';
					return;
				}
			}
			var resourceId = parseInt(self.newProject.selectedResource.id);
			self.newProject.resourceIdList.push(resourceId);
			self.newProject.tempResourceIdNameList.push({name: self.newProject.selectedResource.name, id: resourceId});
			funcClearNewProjectSelectedResource();
		}
		self.newProject.resourceErrorMessage = '';
	}
	function funcAddResourceName() {
		if(self.newProject.resource && self.newProject.resource.trim() !== '') {
			var tempResource = self.newProject.resource.toLowerCase();
			var length = self.newProject.resourceNameList.length;
			for(var i = 0; i < length; i++) {
				var item = self.newProject.resourceNameList[i].toLowerCase();
				if(item && item === tempResource) {
					self.newProject.resourceErrorMessage = 'That Resource was already added';
					self.newProject.resourceClass = 'input-error';
					return;
				}
			}
			var resourceListLength = self.newProject.resourceList.length;
			for(var j = 0; j < resourceListLength; j++) {
				var item = self.newProject.resourceList[j].name.toLowerCase();
				if(item && item === tempResource) {
					self.newProject.resourceErrorMessage = 'A Resource with that name already exists';
					self.newProject.resourceClass = 'input-error';
					return;
				}
			}
			self.newProject.resourceErrorMessage = '';
			self.newProject.resourceNameList.push(self.newProject.resource);
			self.newProject.tempResourceIdNameList.push({name: self.newProject.resource, id: 0});
			self.newProject.resource = '';
			self.newProject.resourceClass = '';
		} else {
			self.newProject.resourceErrorMessage = 'Resource name cannot be empty';
			self.newProject.resourceClass = 'input-error';
		}
	}
	function funcClearNewProjectDepartmentId() {
		self.newProject.departmentId = '';
	}
	function funcClearNewProjectDeadlineId() {
		self.newProject.deadlineId = '';
	}
	function funcClearNewProjectSelectedResource() {
		self.newProject.selectedResource = '';
	}
	function funcClearNewProjectDepartment() {
		self.newProject.department = '';
		self.newProject.departmentErrorMessage = '';
		self.newProject.departmentClass = ''
	}
	function funcClearNewProjectDeadline() {
		self.newProject.deadline = '';
		self.newProject.deadlineErrorMessage = '';
		self.newProject.deadlineClass = '';
	}
	function funcClearNewProjectResource() {
		self.newProject.resource = '';
		self.newProject.resourceErrorMessage = '';
		self.newProject.resourceClass = '';
	}
	function funcValidateNewProject(isOnBlur) {
		var validation = ProjectService.validate(self.newProject.name);
		if(!validation.isSuccessful && (!isOnBlur || !validation.isEmptyString)) {
			self.newProject.errorMessage = validation.message;
			self.newProject.newProjectClass = 'input-error';
			return false;
		} else {
			self.newProject.errorMessage = '';
			self.newProject.newProjectClass = '';
			return true;
		}
	}
	function funcValidateDepartment(isOnBlur) {
		if(self.newProject.departmentId === '') {
			var validation = DepartmentService.validate(self.newProject.department);
			if(!validation.isSuccessful && (!isOnBlur || !validation.isEmptyString)) {
				self.newProject.departmentErrorMessage = validation.message;
				self.newProject.departmentClass = 'input-error';
				return false;
			} else {
				self.newProject.departmentErrorMessage = '';
				self.newProject.departmentClass = '';
				return true;
			}
		} else {
			return true;
		}
	}
	function funcValidateDeadline(isOnBlur) {
		if(self.newProject.deadlineId === '') {
			var validation = DeadlineService.validate(self.newProject.deadline);
			if(!validation.isSuccessful && (!isOnBlur || !validation.isEmptyString)) {
				self.newProject.deadlineErrorMessage = validation.message;
				self.newProject.deadlineClass = 'input-error';
				return false;
			} else {
				self.newProject.deadlineErrorMessage = '';
				self.newProject.deadlineClass = '';
				return true;
			}
		} else {
			return true;
		}
	}
	function funcValidateResource(isOnBlur) {
		if(self.newProject.resourceId === '') {
			var validation = ResourceService.validate(self.newProject.resource);
			if(!validation.isSuccessful && (!isOnBlur || !validation.isEmptyString)) {
				self.newProject.resourceErrorMessage = validation.message;
				self.newProject.resourceClass = 'input-error';
				return false;
			} else {
				self.newProject.resourceErrorMessage = '';
				self.newProject.resourceClass = '';
				return true;
			}
		} else {
			return true;
		}
	}
	function funcAddNewProject() {
		//name, deadlineId, deadline, departmentId, department, resourceIdList, resourceList
		var valid = true;
		if(!funcValidateNewProject(false)) valid = false;
		if(!funcValidateDepartment(false)) valid = false;
		if(!funcValidateDeadline(false)) valid = false;
		
		if(valid) {
			var newProject = ProjectService.addNoValidation(
				self.newProject.name, 
				parseInt(self.newProject.deadlineId), 
				self.newProject.deadline, 
				parseInt(self.newProject.departmentId), 
				self.newProject.department, 
				self.newProject.resourceIdList, 
				self.newProject.resourceNameList
				);
			if(newProject.isSuccessful) {
				funcHideNewProjectForm(showSuccessNewProjectMessage);
				clearNewProject();
			} else {
				self.newProject.errorMessage = newProject.message;
			}
		} else {
			self.newProject.addErrorMessage = 'Fix errors before proceeding';
		}
	}
	function showSuccessNewProjectMessage() {
		$('.successfully-added-project-message-box').animate({
			top: 50
		}, 150).delay(4000).animate({
			top: -100
		}, 150);
	}
	function isEmptyString(string) {
		if(string && string.length > 0) {
			var trim = string.trim();
			if(trim === '') return true;
			return false;
		}
		return true;
	}
	function clearNewProject() {
		self.newProject.name = '';
		self.newProject.errorMessage = '';
		self.newProject.newProjectClass = '';
		self.newProject.department = '';
		self.newProject.departmentId = '';
		self.newProject.departmentErrorMessage = '';
		self.newProject.departmentClass = '';
		self.newProject.deadline = '';
		self.newProject.deadlineId = '';
		self.newProject.deadlineErrorMessage = '';
		self.newProject.deadlineClass = '';
		self.newProject.resource = '';
		//self.newProject.resourceId = '';
		self.newProject.selectedResource = '';
		self.newProject.resourceErrorMessage = '';
		self.newProject.resourceClass = '';
		self.newProject.addErrorMessage = '';
		self.newProject.tempResourceIdNameList.length = 0;
		self.newProject.resourceIdList.length = 0;
		self.newProject.resourceNameList.length = 0;
	} 
	function funcShowNewProjectForm() {
		$('.add-project-modal').fadeIn();
	}
	function funcHideNewProjectForm(callback) {
		$('.add-project-modal').fadeOut(300, callback);
	}
	function funcCancelAddNewProject() {
		funcHideNewProjectForm();
		clearNewProject();
	}
}