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
	self.deleteEntity = funcDelete;
	self.validate = validateNewModel;
	self.addNoValidation = funcAddNoValidation;
	self.getByObjectList = funcGetByObjectList;

	function funcGetAll() {
		return model;
	}
	function funcGetById(id) {
		var length = model.length;
		for(var i = 0; i < length; i++) {
			var item = model[i];
			if(item.id === id) {
				return item;
			}
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
					if(item.id === idListId) {
						data.push(item);
					}
				}
			}
		}
		return data;
	}
	function funcGetByObjectList(objList) {
		var data = [];
		//console.log(objList);
		var objListLength = objList.length;
		var modelLength = model.length;
		if(objListLength > 0) {
			for(var i = 0; i < objListLength; i++) { 
				var objListId = objList[i].id;
				for(var j = 0; j < modelLength; j++) {
					var item = model[j];
					if(item.id === objListId) {
						data.push(item);
					}
				}
			}
		}
		return data;
	}
	function funcAddNoValidation(name, deadlineId, deadline, departmentId, department, resourceIdList, resourceList, getDept, getDeadline, getResources) {
		var newId = newModelId;
		newModelId++;
		var newModel = getModelObject();
		newModel.id = newId;
		newModel.name = name;
		if(deadlineId && deadlineId > 0) { 
			DeadlineService.addNewRef({id: deadlineId, refId: newId, name: name});
			var existingDeadline = DeadlineService.getById(deadlineId);
			newModel.refs.deadline = {id: deadlineId, name: existingDeadline.name}; 
		} else if(deadline && deadline.length > 0) { 
			var newDeadline = DeadlineService.addNoValidation(deadline, {id: newId, name: name}, function(value) { return function() { return funcGetByObjectList(value); } });
			newModel.refs.deadline = {id: newDeadline.newItem.id, name: deadline};
		}
		if(departmentId && departmentId > 0) {
			DepartmentService.addNewRef({id: departmentId, refId: newId, name: name});
			var existingDepartment = DepartmentService.getById(departmentId);
			newModel.refs.department = {id: departmentId, name: existingDepartment.name};
		} else if(department && department.length > 0) {
			var newDepartment = DepartmentService.addNoValidation(department, {id: newId, name: name}, function(value) { return function() { return funcGetByObjectList(value); } } );
			newModel.refs.department = {id: newDepartment.newItem.id, name: department};
		}
		if(resourceIdList && resourceIdList.length > 0) {
			var resourceIdListLength = resourceIdList.length;
			for(var i = 0; i < resourceIdListLength; i++) {
				var resourceIdListId = parseInt(resourceIdList[i].id);
				ResourceService.addNewRef({id: resourceIdListId, refId: newId, name: name});
				var existingResource = ResourceService.getById(resourceIdListId);
				newModel.refs.resources.push({id: resourceIdListId, name: existingResource.name});
			}
		}
		if(resourceList && resourceList.length > 0 && resourceList[0].trim() !== '') {
			var resourceListLength = resourceList.length;
			for(var i = 0; i < resourceListLength; i++) {
				var newResource = ResourceService.addNoValidation(resourceList[i], {id: newId, name: name}, function(value) { return function() { return funcGetByObjectList(value); } });
				var newResourceItem = newResource.newItem;
				newModel.refs.resources.push({id: newResourceItem.id, name: newResourceItem.name});
			}
		}
		newModel.department = getDept(newModel.refs.department.id);
		newModel.deadline = getDeadline(newModel.refs.deadline.id);
		newModel.resources = getResources(newModel.refs.resources);
		model.push(newModel);
		return {isSuccessful: true, message: '', newItem: newModel};
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
		//console.log(newModel);
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
			refs: {
				deadline: 0,
				department: 0,
				resources: []
			},
			resourceLength: function(id) { return getResourcesLength(id); }
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
	function getResourcesLength(id) {
		var length = model.length;
		for(var i = 0; i < length; i++) {
			var item = model[i];
			if(item.id === id) {
				return item.refs.resources.length;
			}
		}
	}
	var model = [ 
		{ 
			id: 1,
			name: "Show Three Lists",
			refs: {
				deadline: {id: 1, name: 'April 01, 2016 12:00:00'},
				department: {id: 1, name: 'App Engineering'},
				resources: [
					{id: 1, name: 'Kirk Middleton'},
					{id: 2,	name: 'Spenser Estrada'},
					{id: 3, name: 'Kierra Buckner'}
				]
			},
			resourceLength: function(id) { return getResourcesLength(id); }
		},
		{
			id: 2,
			name: "Make Stepped List",
			refs: {
				deadline: {id: 2, name: 'March 15, 2016 12:00:00'},
				department: {id: 2, name: 'Marketing'},
				resources: [
					{id: 2, name: 'Spenser Estrada'},
					{id: 3, name: 'Kierra Buckner'},
					{id: 4, name: 'Hunter Luna'}
				]
			},
			resourceLength: function(id) { return getResourcesLength(id); }
		},
		{
			id: 3,
			name: "Add UI-Router Rules",
			refs: {
				deadline: {id: 3, name: 'May 01, 2016 12:00:00'},
				department: {id: 3, name: 'DBAdmin'},
				resources: [
					{id: 5, name: 'Ahmad Justice'},
					{id: 6, name: 'Breana Medina'}
				]
			},
			resourceLength: function(id) { return getResourcesLength(id); }
		},
		{
			id: 4,
			name: "Create Filters",
			refs: {
				deadline: {id: 4, name: 'January 01, 2016 12:00:00'},
				department: {id: 4, name: 'SysOps'},
				resources: [
					{id: 1, name: 'Kirk Middleton'},
					{id: 6, name: 'Breana Medina'},
					{id: 7, name: 'Shelbie Cervantes'},
					{id: 2, name: 'Spenser Estrada'}
				]
			},
			resourceLength: function(id) { return getResourcesLength(id); }
		},
		{
			id: 5,
			name: "Sum Up Subtotals",
			refs: {
				deadline: {id: 5, name: 'July 07, 2016 12:00:0'},
				department: {id: 5, name: 'Embedded'},
				resources: [
					{id: 3, name: 'Kierra Buckner'},
					{id: 5, name: 'Ahmad Justice'},
					{id: 7, name: 'Shelbie Cervantes'}
				]
			},
			resourceLength: function(id) { return getResourcesLength(id); }
		}
	];
}