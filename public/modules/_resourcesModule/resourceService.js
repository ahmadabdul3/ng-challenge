angular.module('ChallengeApp')
.service('ResourceService', ResourceService);

ResourceService.$inject = [];

function ResourceService() { 
	var self = this;
	var newModelId = 8;
	var entityType = 'Resource';
	self.getAll = funcGetAll;
	self.getById = funcGetById;
	self.getByIdList = funcGetByIdList;
	self.addNew = funcAddNew;
	self.validate = validateNewModel;
	self.addNoValidation = funcAddNoValidation;
	self.deleteReferences = funcDeleteReferences;
	self.getByObjectList = funcGetByObjectList;
	self.addNewRef = funcAddNewRef; 
	self.deleteEntity = funcDelete;
	self.tryDelete = funcTryDelete;

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
	function funcAddNewRef(param) {
		var length = model.length;
		for(var i = 0; i < length; i++) {
			var item = model[i];
			if(item.id === param.id) {
				item.refs.projects.push({id: param.refId, name: param.name});
			}
		}
	}
	function funcGetByObjectList(objList) {
		var data = [];
		var objListLength = objList.length;
		//if(objList) objListLength = objList.length;
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
	function funcDeleteReferences(id) {
		var length = model.length;
		for(var i = 0; i < length; i++) {
			var item = model[i];
			var refLength = item.refs.projects.length;
			for(var j = 0; j < refLength; j++) {
				var ref = item.refs.projects[j];
				if(ref.id === id) {
					item.refs.projects.splice(j, 1);
					j--;
					refLength--;
				}
			}
		}
	}
	function funcTryDelete(id, name) {
		var length = model.length;
		for(var i = 0; i < length; i++) {
			var item = model[i];
			if(item.id === id) {
				if(funcHasReferences(item)) {
					return {
						isSuccessful: false, 
						message: 'There are Projects assigned to this Resource. Please remove the corresponding Projects before deleting.'
					};
				}
				return { isSuccessful: true, message: ''};
			}
		}
	}
	function funcDelete(id) {
		var length = model.length;
		for(var i = 0; i < length; i++) {
			var item = model[i];
			if(item.id === id) {
				model.splice(i, 1);
				return;
			}
		}
	}
	function funcHasReferences(item) {
		if(item.refs.projects.length > 0) return true;
		return false;
	}
	function funcAddNoValidation(name, projIdName, getProjects) {
		var newModel = getModelObject();
		var newId = newModelId;
		newModelId++;
		newModel.id = newId;
		newModel.name = name;
		if(projIdName && projIdName !== null && typeof projIdName !== 'undefined') newModel.refs.projects.push(projIdName);
		if(typeof getProjects !== 'undefined' && getProjects !== null) newModel.projects = getProjects(newModel.refs.projects);
		model.push(newModel);
		return {isSuccessful: true, message: '', newItem: newModel};
	}
	function funcAddNew(name, projectId) {
		var validation = validateNewModel(name);
		if(!validation.isSuccessful) return validation;
		var newModel = getModelObject();
		var newId = newModelId;
		newModelId++;
		newModel.id = newId;
		newModel.name = name;
		if(projectId && projectId > 0) newModel.refs.projects.push(projectId);
		model.push(newModel);
		return {isSuccessful: true, message: '', newItem: newModel};
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
	function getModelObject() {
		return {
			id: 0,
			name: '',
			/*project: function() { return ProjectService.getByIdList(this.refs.projects); },*/
			refs: {
				projects: []
			}
		};
	}




	var model = [
		{
			id: 1,
			name: 'Kirk Middleton',
			refs: {
				projects: [
					{id: 1, name: 'Show Three Lists'},
					{id: 4, name: 'Create Filters'}
				]
			}
		},
		{
			id: 2,
			name: "Spenser Estrada",
			refs: {
				projects: [
					{id: 1, name: 'Show Three Lists'},
					{id: 2, name: 'Make Stepped List'},
					{id: 4, name: 'Create Filters'}
				]
			}
		},
		{
			id: 3,
			name: "Kierra Buckner",
			refs: {
				projects: [
					{id: 1, name: 'Show Three Lists'},
					{id: 2, name: 'Make Stepped List'},
					{id: 5, name: 'Sum Up Subtotals'}
				]
			}
		},
		{
			id: 4,
			name: "Hunter Luna",
			refs: {
				projects: [
					{id: 2, name: 'Make Stepped List'},
					{id: 5, name: 'Sum Up Subtotals'}
				]
			}
		},
		{
			id: 5,
			name: "Ahmad Justice",
			refs: {
				projects: [
					{id: 3, name: 'Add UI-Router Rules'},
					{id: 5, name: 'Sum Up Subtotals'}
				]
			}
		},
		{
			id: 6,
			name: "Breana Medina",
			refs: {
				projects: [
					{id: 3, name: 'Add UI-Router Rules'},
					{id: 4, name: 'Create Filters'}
				]
			}
		},
		{
			id: 7,
			name: "Shelbie Cervantes",
			refs: {
				projects: [
					{id: 4, name: 'Create Filters'},
					{id: 5, name: 'Sum Up Subtotals'}
				]
			}
		}
	];

}


