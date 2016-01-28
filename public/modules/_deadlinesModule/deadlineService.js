angular.module('ChallengeApp')
.service('DeadlineService', DeadlineService);

function DeadlineService() { 
	var self = this;
	var newModelId = 6;
	var entityType = 'Deadline';
	self.getAll = funcGetAll;
	self.getById = funcGetById;
	self.getByIdList = funcGetByIdList;
	self.addNew = funcAddNew;
	self.validate = validateNewModel;
	self.addNoValidation = funcAddNoValidation;
	self.deleteReferences = funcDeleteReferences;
	self.addNewRef = funcAddNewRef;
	self.tryDelete = funcTryDelete;
	self.deleteEntity = funcDelete;

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
	function funcDeleteReferences(id) {
		var length = model.length;
		for(var i = 0; i < length; i++) {
			var item = model[i];
			var refLength = item.refs.projects.length;
			for(var j = 0; j < refLength; j++) {
				var ref = item.refs.projects[j];
				if(ref.id === id) {
					item.refs.projects.splice(j, 1);
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
						message: 'There are Projects assigned to this Deadline. Please remove the corresponding Projects before deleting.'
					};
				}
				return { isSuccessful: true, message: ''};
			}
		}
	}
	function funcHasReferences(item) {
		if(item.refs.projects.length > 0) return true;
		return false;
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
			name: "April 01, 2016 12:00:00",
			refs: {
				projects: [
					{id: 1, name: 'Show Three Lists'}
				]
			}
		},
		{
			id: 2,
			name: "March 15, 2016 12:00:00",
			refs: {
				projects: [
					{id: 2, name: 'Make Stepped List'}
				]
			}
		},
		{
			id: 3,
			name: "May 01, 2016 12:00:00",
			refs: {
				projects: [
					{id: 3, name: 'Add UI-Router Rules'}
				]
			}
		},
		{
			id: 4,
			name: "January 01, 2016 12:00:00",
			refs: {
				projects: [
					{id: 4, name: 'Create Filters'}
				]
			}
		},
		{
			id: 5,
			name: "July 07, 2016 12:00:00",
			refs: {
				projects: [
					{id: 5, name: 'Sum Up Subtotals'}
				]
			}
		}
	];

}


