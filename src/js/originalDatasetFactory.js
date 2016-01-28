angular.module('ChallengeApp')
.factory('originalDatasetFactory', challengeListFactory);


function originalDatasetFactory() {
	var datasetObject = {
		getRestructuredDataset: getRestructuredDataset
	}

	function getRelationalDataset() {
		var departments = [
			one: {
				id: 1,
				name: "App Engineering",
				refs: {
					projects: [
						projects.one
					]
				}
			},
			two: {
				id: 2,
				name: "Marketing",
				refs: {
					projects: [
						projects.two
					]
				}
			},
			three: {
				id: 3,
				name: "DBAdmin",
				refs: {
					projects: [
						projects.three
					]
				}
			},
			four: {
				id: 4,
				name: "SysOps",
				refs: {
					projects: [
						projects.four
					]
				}
			},
			five: {
				id: 5,
				name: "Embedded",
				refs: {
					projects: [
						projects.five
					]
				}
			},
			six: {
				id: 6,
				name: "GroceryOps",
				refs: {
					projects: [

					]
				}
			},
		];
		var deadlines = [
			one: {
				id: 1,
				name: "April 01, 2016 12:00:00",
				refs: {
					projects: [
						projects.one
					]
				}
			},
			two: {
				id: 2,
				name: "March 15, 2016 12:00:00",
				refs: {
					projects: [
						projects.two
					]
				}
			},
			three: {
				id: 3,
				name: "May 01, 2016 12:00:00",
				refs: {
					projects: [
						projects.three
					]
				}
			},
			four: {
				id: 4,
				name: "January 01, 2016 12:00:00",
				refs: {
					projects: [
						projects.four
					]
				}
			},
			five: {
				id: 4,
				name: "July 07, 2016 12:00:00",
				refs: {
					projects: [
						projects.five
					]
				}
			}
		];
		var resources = [
			one: {
				id: 1,
				name: 'Kirk Middleton',
				refs: {
					projects: [
						projects.one,
						projects.four
					]
				}
			},
			two: {
				id: 2,
				name: "Spenser Estrada",
				refs: {
					projects: [
						projects.one,
						projects.two,
						projects.four
					]
				}
			},
			three: {
				id: 3,
				name: "Kierra Buckner",
				refs: {
					projects: [
						projects.one,
						projects.two,
						projects.five
					]
				}
			},
			four: {
				id: 4,
				name: "Hunter Luna",
				refs: {
					projects: [
						projects.two,
						projects.five
					]
				}
			},
			five: {
				id: 5,
				name: "Ahmad Justice",
				refs: {
					projects: [
						projects.three,
						projects.five
					]
				}
			},
			six: {
				id: 6,
				name: "Breana Medina",
				refs: {
					projects: [
						projects.three,
						projects.four
					]
				}
			},
			seven: {
				id: 7,
				name: "Shelbie Cervantes",
				refs: {
					projects: [
						projects.four,
						projects.five
					]
				}
			}
		];
		function projects() {
			var data = [ 
				{ 
					id: 1,
					name: "Show Three Lists",
					refs: {
						deadline: deadlines.one,
						department: departments.one,
						resources: [
							resources.one,
							resources.two,
							resources.three
						]
					}
				},
				{
					id: 2,
					name: "Make Stepped List",
					refs: {
						deadline: deadlines.two,
						department: departments.two,
						resources: [
							resources.two,
							resources.three,
							resources.four
						]
					}
				},
				{
					id: 3,
					name: "Add UI-Router Rules",
					refs: {
						deadline: deadlines.three,
						department: departments.three,
						resources: [
							resources.five,
							resources.six
						]
					}
				},
				{
					id: 4,
					name: "Create Filters",
					refs: {
						deadline: deadlines.four,
						department: departments.four,
						resources: [
							resources.one,
							resources.six,
							resources.seven,
							resources.two
						]
					}
				},
				{
					id: 5,
					name: "Sum Up Subtotals",
					refs: {
						deadline: deadlines.five,
						department: departments.five,
						resources: [
							resources.three,
							resources.five,
							resources.seven
						]
					}
				}
			];
			function getAll() {
				return data;
			}
			function getById(id) {
				return data[id];
			}
		}

	}

	function originalDataset() {
	  var data = {
		  "deadlines" : [
		    "April 01, 2016 12:00:00",
		    "March 15, 2016 12:00:00",
		    "May 01, 2016 12:00:00",
		    "January 01, 2016 12:00:00",
		    "July 07, 2016 12:00:00"
		  ],
		  "projects" : 
		   [
		    "Show Three Lists",
		    "Make Stepped List",
		    "Add UI-Router Rules",
		    "Create Filters",
		    "Sum Up Subtotals"
		   ],
		  "departments" : 
		  [
		    "App Engineering",
		    "Marketing",
		    "DBAdmin"
		    "SysOps",
		    "Embedded",
		    "GroceryOps"
		  ],
		  "resources" : 
		  [
		    "Kirk Middleton",
		    "Spenser Estrada",
		    "Kierra Buckner",
		    "Hunter Luna",
		    "Ahmad Justice",
		    "Breana Medina",
		    "Shelbie Cervantes"
		  ]
		};
	}

}