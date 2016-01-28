angular.module('PortfolioMain')
.service('HeaderSectionService', HeaderSectionService);


function HeaderSectionService() {
	var self = this;

	self.getH1 = function() { return funcGetH1(); };
	self.getH3 = function() { return funcGetH3(); };
	self.getH4 = function() { return funcGetH4(); };
	self.getNavigationLinks = function() { return funcGetNavigationLinks(); };
	self.getItems = function() { return funcGetItems(); };

	function funcGetH1() { return HeaderSectionH1; }
	function funcGetH3() { return HeaderSectionH3; }
	function funcGetH4() { return HeaderSectionH4; }
	function funcGetNavigationLinks() { return HeaderSectionNavigationLinks; }
	function funcGetItems() { return HeaderSectionItems; }

	var HeaderSectionH1 = "Title - sub";
	var HeaderSectionH3 = "llorem ipsum dolor sit";
	var HeaderSectionH4 = "llorem ipsum dolor sit llorem ipsum dolor sit";
	var HeaderSectionItems = [];
	var HeaderSectionNavigationLinks = ['page 1', 'page 2', 'page 3', 'page 4'];
}