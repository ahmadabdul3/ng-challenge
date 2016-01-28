angular.module('PortfolioMain')
.service('SkillsSectionService', SkillsSectionService);


function SkillsSectionService() {
	var self = this;

	self.getH3 = function() { return funcGetH3(); };
	self.getTitles = function() { return funcGetTitles(); };
	self.getFirstItems = function() { return funcGetFirstItems(); };
	self.getSecondItems = function() { return funcGetSecondItems(); };

	function funcGetH3() { return SkillsSectionH3; }
	function funcGetTitles() { return SkillsSectionTitles; }
	function funcGetFirstItems() { return SkillsSectionItemsOne; }
	function funcGetSecondItems() { return SkillsSectionItemsTwo; }

	var SkillsSectionH3 = "My skills and likes";
	var SkillsSectionTitles = [
		{ text: 'Beginner', ngclass: 'skl-lvl-beg' },
		{ text: 'Intermediate', ngclass: 'skl-lvl-intr' },
		{ text: 'Advanced', ngclass: 'skl-lvl-adv' }
	];
	var SkillsSectionItemsOne = [
		{ text: 'Javascript', ngclass: 'skl-lvl-adv'},
		{ text: 'AngularJs', ngclass: 'skl-lvl-intr'},
		{ text: 'Gulp', ngclass: 'skl-lvl-beg'},
		{ text: 'HTML', ngclass: 'skl-lvl-adv'},
		{ text: 'CSS/SASS', ngclass: 'skl-lvl-adv'},
		{ text: 'NodeJs', ngclass: 'skl-lvl-beg'}
	];
	var SkillsSectionItemsTwo = [
		{ text: 'ASP.NET-MVC', ngclass: 'skl-lvl-adv'},
		{ text: 'ExpressJs', ngclass: 'skl-lvl-beg'},
		{ text: 'Entity Framework', ngclass: 'skl-lvl-intr'},
		{ text: 'C#/Linq', ngclass: 'skl-lvl-adv'},
		{ text: 'UI/UX', ngclass: 'skl-lvl-intr'},
		{ text: 'OOD', ngclass: 'skl-lvl-adv'}
	];
}