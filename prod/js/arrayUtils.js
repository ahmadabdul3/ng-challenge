angular.module('ArrayUtilities', [])
.factory('ArrayUtils', ArrayUtils);

function ArrayUtils() {
	var util = {
		sortObjectsAlphabetically: funcSortObjectsAlphabetically,
	}

	function funcSortObjectsAlphabetically(array) {
		return array.sort(function(a,b){
			var aLowerCase = a.name.toLowerCase(), 
			bLowerCase = b.name.toLowerCase();
			return aLowerCase > bLowerCase ? 1 : aLowerCase < bLowerCase ? -1 : 0;
		});
	}

	return util;
}