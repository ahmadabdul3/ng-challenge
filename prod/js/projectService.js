angular.module('ChallengeApp')
.service('ProjectService', ProjectService);

ProjectService.$inject = ['DepartmentService', 'DeadlineService', 'ResourceService'];

function ProjectService(DepartmentService, DeadlineService, ResourceService) {
	var self = this;
	var newModelId = 6;
	var entityType = 'Project';
	self.getAll = funcGetAll;
	self.getById = funcGetById;
	self.getByIdList = funcGetByIdList;
	self.addNew = funcAddNew;
	self.delete = funcDelete;
	self.validate = validateNewModel;
	self.addNoValidation = funcAddNoValidation;

	function funcGetAll() {
		return model;
	}
	function funcGetById(id) {
		var length = model.length;
		for(var i = 0; i < length; i++) {
			var item = model[i];
			if(item.id === id) return item;
		}
	}
	function funcGetByIdList(idList) {
		var data = [];
		var idListLength = idList.length;
		var modelLength = model.length;
		if(idListLength > 0) {
			for(var i = 0; i < idListLength; i++) { 
				var idListId = idList[i];
				for(var j = 0; j < modelLength; j++) {
					var item = model[j];
					if(item.id === idListId) data.push(item);
				}
			}
		}
		return data;
	}
	function funcAddNoValidation(name, deadlineId, deadline, departmentId, department, resourceIdList, resourceList) {
		var newId = newModelId;
		newModelId++;
		var newModel = getModelObject();
		newModel.id = newId;
		newModel.name = name;
		if(deadlineId && deadlineId > 0) { 
			newModel.refs.deadline = deadlineId; 
		} else if(deadline && deadline.length > 0) { 
			var newDeadline = DeadlineService.addNoValidation(deadline, newId);
			newModel.refs.deadline = newDeadline.id;
		}
		if(departmentId && departmentId > 0) {
			newModel.refs.department = departmentId;
		} else if(department && department.length > 0) {
			var newDepartment = DepartmentService.addNoValidation(department, newId);
			newModel.refs.department = newDepartment.id;
		}
		if(resourceIdList && resourceIdList.length > 0) {
			var resourceIdListLength = resourceIdList.length;
			for(var i = 0; i < resourceIdListLength; i++) {
				newModel.refs.resources.push(resourceIdList[i]);
			}
		}
		if(resourceList && resourceList.length > 0 && resourceList[0].trim() !== '') {
			var resourceListLength = resourceList.length;
			for(var i = 0; i < resourceListLength; i++) {
				var newResource = ResourceService.addNoValidation(resourceList[i], newId);
				newModel.refs.resources.push(newResource.id);
			}
		}
		model.push(newModel);
		return {isSuccessful: true, message: '', id: newId};
	}
	function funcAddNew(name, deadlineId, deadline, departmentId, department, resourceIdList, resourceList) {
		//console.log(name, deadlineId + deadline + departmentId + department + resourceIdList + resourceList);
		var validation = validateNewModel(name);
		if(!validation.isSuccessful) return validation;
		var newId = newModelId;
		newModelId++;
		var newModel = getModelObject();
		newModel.id = newId;
		newModel.name = name;
		if(deadlineId && deadlineId > 0) { 
			newModel.refs.deadline = deadlineId; 
		} else if(deadline && deadline.length > 0) { 
			var newDeadline = DeadlineService.addNew(deadline, newId);
			if(!newDeadline.isSuccessful) return newDeadline;
			newModel.refs.deadline = newDeadline.id;
		}
		if(departmentId && departmentId > 0) {
			newModel.refs.department = departmentId;
		} else if(department && department.length > 0) {
			var newDepartment = DepartmentService.addNew(department, newId);
			if(!newDepartment.isSuccessful) return newDepartment;
			newModel.refs.department = newDepartment.id;
		}
		if(resourceIdList && resourceIdList.length > 0) {
			var resourceIdListLength = resourceIdList.length;
			for(var i = 0; i < resourceIdListLength; i++) {
				newModel.refs.resources.push(resourceIdList[i]);
			}
		}
		if(resourceList && resourceList.length > 0 && resourceList[0].trim() !== '') {
			var resourceListLength = resourceList.length;
			for(var i = 0; i < resourceListLength; i++) {
				var newResourceId = ResourceService.addNew(resourceList[i], newId);
				newModel.refs.resources.push(newResourceId);
			}
		}
		console.log(newModel);
		model.push(newModel);
		return {isSuccessful: true, message: '', id: newId};
	}
	function funcDelete(id) {
		var length = model.length;
		for(var i = 0; i < length; i++) {
			var item = model[i];
			if(item.id === id) {
				model.splice(i, 1);
				DepartmentService.deleteReferences(id);
				DeadlineService.deleteReferences(id);
				ResourceService.deleteReferences(id);
				return;
			}
		}
	}
	function getModelObject() {
		return {
			id: 0,
			name: '',
			deadline: function() { return DeadlineService.getById(this.refs.deadline); },
			department: function() { return DepartmentService.getById(this.refs.department); },
			resources: function() { return ResourceService.getByIdList(this.refs.resources); },
			refs: {
				deadline: 0,
				department: 0,
				resources: []
			}
		};
	}
	function validateNewModel(newName) {
		var trimmed = newName.trim().toLowerCase();
		if(trimmed === '') {
			return {isSuccessful: false, isEmptyString: true, message: entityType + ' name cannot be empty'};
		} else {
			var length = model.length;
			for(var i = 0; i < length; i++) {
				var item = model[i];
				if(item.name.toLowerCase() === trimmed) {
					return {isSuccessful: false, isEmptyString: false, message: 'A ' + entityType + ' with that name already exists'};
				}
			}
		}
		return {isSuccessful: true, message: ''};
	}
	var model = [ 
		{ 
			id: 1,
			name: "Show Three Lists",
			department: function() { return DepartmentService.getById(this.refs.department); },
			deadline: function() { return DeadlineService.getById(this.refs.deadline); },
			resources: function() { return ResourceService.getByIdList(this.refs.resources); },
			refs: {
				deadline: 1,
				department: 1,
				resources: [
					1,
					2,
					3
				]
			}
		},
		{
			id: 2,
			name: "Make Stepped List",
			department: function() { return DepartmentService.getById(this.refs.department); },
			deadline: function() { return DeadlineService.getById(this.refs.deadline); },
			resources: function() { return ResourceService.getByIdList(this.refs.resources); },
			refs: {
				deadline: 2,
				department: 2,
				resources: [
					2,
					3,
					4
				]
			}
		},
		{
			id: 3,
			name: "Add UI-Router Rules",
			department: function() { return DepartmentService.getById(this.refs.department); },
			deadline: function() { return DeadlineService.getById(this.refs.deadline); },
			resources: function() { return ResourceService.getByIdList(this.refs.resources); },
			refs: {
				deadline: 3,
				department: 3,
				resources: [
					5,
					6
				]
			}
		},
		{
			id: 4,
			name: "Create Filters",
			department: function() { return DepartmentService.getById(this.refs.department); },
			deadline: function() { return DeadlineService.getById(this.refs.deadline); },
			resources: function() { return ResourceService.getByIdList(this.refs.resources); },
			refs: {
				deadline: 4,
				department: 4,
				resources: [
					1,
					6,
					7,
					2,
				]
			}
		},
		{
			id: 5,
			name: "Sum Up Subtotals",
			department: function() { return DepartmentService.getById(this.refs.department); },
			deadline: function() { return DeadlineService.getById(this.refs.deadline); },
			resources: function() { return ResourceService.getByIdList(this.refs.resources); },
			refs: {
				deadline: 5,
				department: 5,
				resources: [
					3,
					5,
					7,
				]
			}
		}
	];
}