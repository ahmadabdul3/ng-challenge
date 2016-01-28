angular.module('ChallengeApp')
.controller('DepartmentController', DepartmentController);


DepartmentController.$inject = ['DepartmentService', 'ProjectService', 'NewDepartmentService', 'DeadlineService', 'ResourceService'];

function DepartmentController(DepartmentService, ProjectService, NewDepartmentService, DeadlineService, ResourceService) {
	
	var self = this;
	var projects = ProjectService.getAll();
	setUpProjects();
	self.departments = DepartmentService.getAll();
	setUpDepartments();
	self.newDepartment = NewDepartmentService.newDepartment;
	self.entityType = 'Department';
	
	self.deleteDepartment = funcDeleteDepartment;
	self.getDepartmentProjects = getDepartmentProjects;
	self.showNewDepartmentForm = funcShowNewDepartmentForm;
	self.addNewDepartment = NewDepartmentService.addNewDepartment;
	self.validateNewDepartment = NewDepartmentService.validateNewDepartment;
	self.cancelAddNewDepartment = NewDepartmentService.cancelAddNewDepartment;

	var entityType = 'Department';


	function funcDeleteDepartment(id, name) {
		if(confirm('Are you sure you want to delete ' + entityType + ' "' + name + '"? This action cannot be undone!')) {
			var result = DepartmentService.tryDelete(id);
			if(result.isSuccessful) DepartmentService.deleteEntity(id);
			else alert(result.message);
		}
	}
	function getDepartmentProjects(department, idList) {
		return ProjectService.getByIdList(idList);
	}
	
	function funcShowNewDepartmentForm() {
		$('.add-project-modal').fadeIn();
	}
	function funcHideNewDepartmentForm(callback) {
		$('.add-project-modal').fadeOut(300, callback);
	}
	function setUpDepartments() {
		var length = self.departments.length;
		for(var i = 0; i < length; i++) {
			var item = self.departments[i];
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
	function setUpProjects() {
		var length = projects.length;
		for(var i = 0; i < length; i++) {
			var item = projects[i];
			if(typeof item.department === 'undefined') {
				item.department = funcGetProjectDepartment(item.refs.department);//function() { return DepartmentService.getById(item.refs.department.id); };
			}
			if(typeof item.deadline === 'undefined') {
				item.deadline = funcGetProjectDeadline(item.refs.deadline);//function() { return DeadlineService.getById(item.refs.deadline.id); };
			}
			if(typeof item.resources === 'undefined') {
				item.resources = funcGetResourcesByObjectList(item.refs.resources);//function() { return ResourceService.getByObjectList(item.refs.resources); };
			}
		}
	}
	function funcGetResourcesByObjectList(list) {
		return function() {
			return ResourceService.getByObjectList(list); 
		}
	}
	function funcGetProjectDepartment(item) {
		return function() {
			return DepartmentService.getById(item.id);
		}
	}
	function funcGetProjectDeadline(item) {
		return function() {
			return DeadlineService.getById(item.id);
		}
	}

}


