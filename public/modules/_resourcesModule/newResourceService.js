angular.module('ChallengeApp')
.service('NewResourceService', NewResourceService);

NewResourceService.$inject = ['ResourceService', 'ProjectService'];

function NewResourceService(ResourceService, ProjectService) {
	var self = this;
	self.newResource = {
		name: '',
		errorMessage: '',
		addErrorMessage: '',
		class: ''
	};

	self.addNewResource = funcAddNewResource;
	self.cancelAddNewResource = funcCancelAddNewResource;
	self.showNewResourceForm = funcShowNewResourceForm;
	self.hideNewResourceForm = funcHideNewResourceForm;
	self.validateNewResource = funcValidateNewResource;

	function funcClearNewResourceResource() {
		self.newResource.name = '';
		self.newResource.resourceErrorMessage = '';
		self.newResource.resourceClass = ''
	}
	function funcValidateNewResource(isOnBlur) {
		var validation = ResourceService.validate(self.newResource.name);
		if(!validation.isSuccessful && (!isOnBlur || !validation.isEmptyString)) {
			self.newResource.errorMessage = validation.message;
			self.newResource.class = 'input-error';
			return false;
		} else {
			self.newResource.errorMessage = '';
			self.newResource.class = '';
			return true;
		}
	}
	function funcAddNewResource() {
		//name, resourceId, resource, resourceId, resource, resourceIdList, resourceList
		var valid = true;
		if(!funcValidateNewResource(false)) valid = false;
		
		if(valid) {
			var newResource = ResourceService.addNoValidation(
				self.newResource.name, 
				function(value) { return function() { return ProjectService.getById(value); } } 
				);
			if(newResource.isSuccessful) {
				funcHideNewResourceForm(showSuccessNewResourceMessage);
				clearNewResource();
			} else {
				self.newResource.errorMessage = newResource.message;
			}
		} else {
			self.newResource.addErrorMessage = 'Fix errors before proceeding';
		}
	}
	function showSuccessNewResourceMessage() {
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
	function clearNewResource() {
		self.newResource.name = '';
		self.newResource.errorMessage = '';
		self.newResource.addErrorMessage = '';
		self.newResource.class = '';
	} 
	function funcShowNewResourceForm() {
		$('.add-project-modal').fadeIn();
	}
	function funcHideNewResourceForm(callback) {
		$('.add-project-modal').fadeOut(300, callback);
	}
	function funcCancelAddNewResource() {
		funcHideNewResourceForm();
		clearNewResource();
	}
}