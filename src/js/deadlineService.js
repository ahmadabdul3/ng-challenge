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
	function funcDeleteReferences(id) {
		var length = model.length;
		for(var i = 0; i < length; i++) {
			var item = model[i];
			var refLength = item.refs.length;
			for(var j = 0; j < refLength; j++) {
				var ref = item.refs[j];
				if(ref === id) {
					item.refs.splice(j, 1);
				}
			}
		}
	}
	function funcAddNoValidation(name, projectId) {
		var newModel = getModelObject();
		var newId = newModelId;
		newModelId++;
		newModel.id = newId;
		newModel.name = name;
		if(projectId && projectId > 0) newModel.refs.projects.push(projectId);
		model.push(newModel);
		return {isSuccessful: true, message: '', id: newId};
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
		return {isSuccessful: true, message: '', id: newId};
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
					1
				]
			}
		},
		{
			id: 2,
			name: "March 15, 2016 12:00:00",
			refs: {
				projects: [
					2
				]
			}
		},
		{
			id: 3,
			name: "May 01, 2016 12:00:00",
			refs: {
				projects: [
					3
				]
			}
		},
		{
			id: 4,
			name: "January 01, 2016 12:00:00",
			refs: {
				projects: [
					4
				]
			}
		},
		{
			id: 5,
			name: "July 07, 2016 12:00:00",
			refs: {
				projects: [
					5
				]
			}
		}
	];

}


