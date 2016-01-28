angular.module('ChallengeApp')
.service('NewDepartmentService', NewDepartmentService);

NewDepartmentService.$inject = ['DepartmentService', 'ProjectService'];

function NewDepartmentService(DepartmentService, ProjectService) {
	var self = this;
	self.newDepartment = {
		name: '',
		errorMessage: '',
		addErrorMessage: '',
		class: ''
	};

	self.addNewDepartment = funcAddNewDepartment;
	self.cancelAddNewDepartment = funcCancelAddNewDepartment;
	self.showNewDepartmentForm = funcShowNewDepartmentForm;
	self.hideNewDepartmentForm = funcHideNewDepartmentForm;
	self.validateNewDepartment = funcValidateNewDepartment;

	function funcClearNewDepartmentDepartment() {
		self.newDepartment.name = '';
		self.newDepartment.departmentErrorMessage = '';
		self.newDepartment.departmentClass = ''
	}
	function funcValidateNewDepartment(isOnBlur) {
		var validation = DepartmentService.validate(self.newDepartment.name);
		if(!validation.isSuccessful && (!isOnBlur || !validation.isEmptyString)) {
			self.newDepartment.errorMessage = validation.message;
			self.newDepartment.class = 'input-error';
			return false;
		} else {
			self.newDepartment.errorMessage = '';
			self.newDepartment.class = '';
			return true;
		}
	}
	function funcAddNewDepartment() {
		//name, deadlineId, deadline, departmentId, department, resourceIdList, resourceList
		var valid = true;
		if(!funcValidateNewDepartment(false)) valid = false;
		
		if(valid) {
			var newDepartment = DepartmentService.addNoValidation(
				self.newDepartment.name, 
				function(value) { return function() { return ProjectService.getById(value); } } 
				);
			if(newDepartment.isSuccessful) {
				funcHideNewDepartmentForm(showSuccessNewDepartmentMessage);
				clearNewDepartment();
			} else {
				self.newDepartment.errorMessage = newDepartment.message;
			}
		} else {
			self.newDepartment.addErrorMessage = 'Fix errors before proceeding';
		}
	}
	function showSuccessNewDepartmentMessage() {
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
	function clearNewDepartment() {
		self.newDepartment.name = '';
		self.newDepartment.errorMessage = '';
		self.newDepartment.addErrorMessage = '';
		self.newDepartment.class = '';
	} 
	function funcShowNewDepartmentForm() {
		$('.add-project-modal').fadeIn();
	}
	function funcHideNewDepartmentForm(callback) {
		$('.add-project-modal').fadeOut(300, callback);
	}
	function funcCancelAddNewDepartment() {
		funcHideNewDepartmentForm();
		clearNewDepartment();
	}
}