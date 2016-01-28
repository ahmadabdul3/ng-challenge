angular.module('ChallengeApp')
.service('NewDeadlineService', NewDeadlineService);

NewDeadlineService.$inject = ['DeadlineService', 'ProjectService'];

function NewDeadlineService(DeadlineService, ProjectService) {
	var self = this;
	self.newDeadline = {
		name: '',
		errorMessage: '',
		addErrorMessage: '',
		class: ''
	};

	self.addNewDeadline = funcAddNewDeadline;
	self.cancelAddNewDeadline = funcCancelAddNewDeadline;
	self.showNewDeadlineForm = funcShowNewDeadlineForm;
	self.hideNewDeadlineForm = funcHideNewDeadlineForm;
	self.validateNewDeadline = funcValidateNewDeadline;

	function funcClearNewDeadlineDeadline() {
		self.newDeadline.name = '';
		self.newDeadline.deadlineErrorMessage = '';
		self.newDeadline.deadlineClass = ''
	}
	function funcValidateNewDeadline(isOnBlur) {
		var validation = DeadlineService.validate(self.newDeadline.name);
		if(!validation.isSuccessful && (!isOnBlur || !validation.isEmptyString)) {
			self.newDeadline.errorMessage = validation.message;
			self.newDeadline.class = 'input-error';
			return false;
		} else {
			self.newDeadline.errorMessage = '';
			self.newDeadline.class = '';
			return true;
		}
	}
	function funcAddNewDeadline() {
		//name, deadlineId, deadline, deadlineId, deadline, resourceIdList, resourceList
		var valid = true;
		if(!funcValidateNewDeadline(false)) valid = false;
		
		if(valid) {
			var newDeadline = DeadlineService.addNoValidation(
				self.newDeadline.name, 
				function(value) { return function() { return ProjectService.getById(value); } } 
				);
			if(newDeadline.isSuccessful) {
				funcHideNewDeadlineForm(showSuccessNewDeadlineMessage);
				clearNewDeadline();
			} else {
				self.newDeadline.errorMessage = newDeadline.message;
			}
		} else {
			self.newDeadline.addErrorMessage = 'Fix errors before proceeding';
		}
	}
	function showSuccessNewDeadlineMessage() {
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
	function clearNewDeadline() {
		self.newDeadline.name = '';
		self.newDeadline.errorMessage = '';
		self.newDeadline.addErrorMessage = '';
		self.newDeadline.class = '';
	} 
	function funcShowNewDeadlineForm() {
		$('.add-project-modal').fadeIn();
	}
	function funcHideNewDeadlineForm(callback) {
		$('.add-project-modal').fadeOut(300, callback);
	}
	function funcCancelAddNewDeadline() {
		funcHideNewDeadlineForm();
		clearNewDeadline();
	}
}