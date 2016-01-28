angular.module('PortfolioMain')
.service('MiniProjectsSectionService', MiniProjectsSectionService);


function MiniProjectsSectionService() {
	var self = this;

	self.getH3 = function() { return funcGetH3(); };
	self.getH4 = function() { return funcGetH4(); };
	self.getItems = function() { return funcGetItems(); };

	function funcGetH3() { return MiniProjectsSectionH3; }
	function funcGetH4() { return MiniProjectsSectionH4; }
	function funcGetItems() { return MiniProjectsSectionItems; }

	var MiniProjectsSectionH3 = "Mini Projects";
	var MiniProjectsSectionH4 = "Interesting things I've done for fun";
	var MiniProjectsSectionItems = [
		{ 
			text: '- Calendar -', 
			imageSource: 'http://p1.pichost.me/i/39/1624709.jpg'
		},
		{ 
			text: '- Fiddle within Fiddle -', 
			imageSource: 'http://www.freedigitalphotos.net/images/category-images/382.jpg'
		},
		{ 
			text: '- Sketch Box -', 
			imageSource: 'http://blog.miroslav-dimitrov.net/wp-content/uploads/2011/03/lancia-rally-sketch-04.jpg'
		},
		{ 
			text: '- text text text text -', 
			imageSource: 'http://www.cardesignfetish.com/wp-content/uploads/2009/02/21.jpg'
		}
	];
}