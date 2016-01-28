angular.module('PortfolioMain', [])
.controller('MainController', MainController);


MainController.$inject = ['SkillsSectionService', 'MiniProjectsSectionService', 'HeaderSectionService'];

function MainController(SkillsSectionService, MiniProjectsSectionService, HeaderSectionService) {
	var self = this;


	self.HeaderSectionH1 = HeaderSectionService.getH1();
	self.HeaderSectionH3 = HeaderSectionService.getH3();
	self.HeaderSectionH4 = HeaderSectionService.getH4();
	self.HeaderSectionNavigationLinks = HeaderSectionService.getNavigationLinks();

	self.SkillsSectionH3 = SkillsSectionService.getH3();
	self.SkillsSectionTitles = SkillsSectionService.getTitles();
	self.SkillsSectionItemsOne = SkillsSectionService.getFirstItems();
	self.SkillsSectionItemsTwo = SkillsSectionService.getSecondItems();

	self.MiniProjectsSectionH3 = MiniProjectsSectionService.getH3();
	self.MiniProjectsSectionH4 = MiniProjectsSectionService.getH4();
	self.MiniProjectsSectionItems = MiniProjectsSectionService.getItems();
}