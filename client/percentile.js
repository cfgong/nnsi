var classifications = {
	"businessAndProfessionalAssociations" :0,
	"culturalAndRecreational" :1,
	"developmentAndHousing" :2,
	"educational" :3,
	"environmental" :4,
	"health" :5,
	"international" :6,
	"law" :7,
	"notClassified" :8,
	"philanthropic" :9,
	"religious" :10,
	"social" :11
};

var percentiles = {
	// classification = 0, revenue = 1, location = 2
	"Adaptive Capacity" : [
							[3.01, 3.09, 3.26, 3.13, 3.24, 3.23, 3.25, 3.16, 3.08, 3.21, 3.16, 3.13],
							[3.1, 3.18,3.18, 3.26, 3.12],
							[3.11, 3.19, 3.11, 2.9, 3.19, 3.18]
						 ],
	"Staff Management" : [
							[3.19, 3.35, 3.27, 3.26, 3.33, 3.33, 3.46, 3.22, 3.19, 3.31, 3.28, 3.22],
							[3.25,3.34,3.3, 3.29, 3.16],
							[3.14, 3.3, 3.15, 3.17, 3.3, 3.29]
						 ],
	"Financial Management": [
								[3.22,3.21,3.34,3.25,3.39, 3.36, 3.22, 3.36, 3.25, 3.32, 3.38, 3.26],
								[3.09, 3.23, 3.39, 3.5, 3.43],
								[3.01, 3.35, 3, 3.21, 3.35, 3.32]
							],
	"External Communication": [
								[3.06,2.99,3.11,3.05,2.96,3.06,3.11,3.08,3.03,2.98,	3.01,2.96],
								[2.92, 2.95, 3.02, 3.14, 3.15],
								[3.02, 3.02, 3.01, 2.94, 3.02, 3.02]
							  ],
	"Board Leadership": [
							[2.99	,3.06,	3.08	,3.06	,3.15	,3.32,	3.45,	3.13,2.99,	3.1	,3.12,	3.15],
							[3.07, 3.13, 3.1, 3.18, 3.07],
							[3.04, 3.13, 3.05, 2.9, 3.13, 3.12]
						],
	"Strategic Planning": [
							[2.96,	2.79	,3.01	,2.92	,2.93,	3.09,3.14,2.93,	2.91,2.98,2.91,3.01],
							[2.82,2.87,2.95,3.1, 3.11],
							[3, 2.95, 3.01, 2.94, 2.94, 2.95]
						  ],
	"Mission Orientation" :[
							[3.12,	3.24,	3.32,3.26,3.5,3.38,	3.37,	3.33	,3.13,	3.34,	3.4	,3.26],
							[3.25, 3.3, 3.37, 3.37, 3.21],
							[3.21, 3.33,3.21,3.22,3.33,3.32]
						   ],
	"Operational Capacity": [
								[2.8	,2.67	,2.94	,2.72,	3.07,	2.84,	2.86,	2.98,	2.89,	2.82,	2.94,	3.02],
								[2.8, 2.76, 2.89, 3.07, 3.12],
								[2.93, 2.89, 2.91, 2.81, 2.89,2.9]
							]
};


Template.results.helpers({
	adaptiveCapacityClassificationScore: function(){
		userID = Meteor.user()._id;
		classification = Origin.find( {$or: [{_id:userID},{organizational_classification:true}] }).fetch()[0]["organizational_classification"];
		var lookup = percentiles["Adaptive Capacity"][0][classifications[classification]];
		return convertToPercentage(lookup);
	},
	adaptiveCapacityRevenueScore: function(){
		userID = Meteor.user()._id;
		revenue = Origin.find( {$or: [{_id:userID},{revenue:true}] }).fetch()[0]["revenue"];
		index = getRevenueSize(revenue);
		var lookup = percentiles["Adaptive Capacity"][1][index];
		return convertToPercentage(lookup);
	},
	adaptiveCapacityLocationScore: function(){
		// userID = Meteor.user()._id;
		// location = Origin.find( {$or: [{_id:userID},{revenue:true}] }).fetch()[0]["revenue"];
		// index = getRevenueSize(revenue);
		// var lookup = percentiles["Adaptive Capacity"][2][index];
		// return convertToPercentage(lookup);
	},
	boardLeadershipClassificationScore: function(){
		userID = Meteor.user()._id;
		classification = Origin.find( {$or: [{_id:userID},{organizational_classification:true}] }).fetch()[0]["organizational_classification"];
		var lookup = percentiles["Board Leadership"][0][classifications[classification]];
		return convertToPercentage(lookup);
	},
	boardLeadershipRevenueScore: function(){
		userID = Meteor.user()._id;
		revenue = Origin.find( {$or: [{_id:userID},{revenue:true}] }).fetch()[0]["revenue"];
		index = getRevenueSize(revenue);
		var lookup = percentiles["Board Leadership"][1][index];
		return convertToPercentage(lookup);
	},
	boardLeadershipLocationScore: function(){

	},
	externalCommunicationClassificationScore: function(){
		userID = Meteor.user()._id;
		classification = Origin.find( {$or: [{_id:userID},{organizational_classification:true}] }).fetch()[0]["organizational_classification"];
		var lookup = percentiles["External Communication"][0][classifications[classification]];
		return convertToPercentage(lookup);
	},
	externalCommunicationRevenueScore: function(){
		userID = Meteor.user()._id;
		revenue = Origin.find( {$or: [{_id:userID},{revenue:true}] }).fetch()[0]["revenue"];
		index = getRevenueSize(revenue);
		var lookup = percentiles["External Communication"][1][index];
		return convertToPercentage(lookup);
	},
	externalCommunicationLocationScore: function(){

	},
	financialManagementClassificationScore: function(){
		userID = Meteor.user()._id;
		classification = Origin.find( {$or: [{_id:userID},{organizational_classification:true}] }).fetch()[0]["organizational_classification"];
		var lookup = percentiles["Financial Management"][0][classifications[classification]];
		return convertToPercentage(lookup);
	},
	financialManagementRevenueScore: function(){
		userID = Meteor.user()._id;
		revenue = Origin.find( {$or: [{_id:userID},{revenue:true}] }).fetch()[0]["revenue"];
		index = getRevenueSize(revenue);
		var lookup = percentiles["Financial Management"][1][index];
		return convertToPercentage(lookup);
	},
	financialManagementLocationScore: function(){

	},
	missionOrientationClassificationScore: function(){
		userID = Meteor.user()._id;
		classification = Origin.find( {$or: [{_id:userID},{organizational_classification:true}] }).fetch()[0]["organizational_classification"];
		var lookup = percentiles["Mission Orientation"][0][classifications[classification]];
		return convertToPercentage(lookup);
	},
	missionOrientationRevenueScore: function(){
		userID = Meteor.user()._id;
		revenue = Origin.find( {$or: [{_id:userID},{revenue:true}] }).fetch()[0]["revenue"];
		index = getRevenueSize(revenue);
		var lookup = percentiles["Mission Orientation"][1][index];
		return convertToPercentage(lookup);
	},
	missionOrientationLocationScore: function(){

	},
	operationalCapacityClassificationScore: function(){
		userID = Meteor.user()._id;
		classification = Origin.find( {$or: [{_id:userID},{organizational_classification:true}] }).fetch()[0]["organizational_classification"];
		var lookup = percentiles["Operational Capacity"][0][classifications[classification]];
		return convertToPercentage(lookup);
	},
	operationalCapacityRevenueScore: function(){
		userID = Meteor.user()._id;
		revenue = Origin.find( {$or: [{_id:userID},{revenue:true}] }).fetch()[0]["revenue"];
		index = getRevenueSize(revenue);
		var lookup = percentiles["Operational Capacity"][1][index];
		return convertToPercentage(lookup);
	},
	operationalCapacityLocationScore: function(){

	},
	staffManagementClassificationScore: function(){
		userID = Meteor.user()._id;
		classification = Origin.find( {$or: [{_id:userID},{organizational_classification:true}] }).fetch()[0]["organizational_classification"];
		var lookup = percentiles["Staff Management"][0][classifications[classification]];
		return convertToPercentage(lookup);
	},
	staffManagementRevenueScore: function(){
		userID = Meteor.user()._id;
		revenue = Origin.find( {$or: [{_id:userID},{revenue:true}] }).fetch()[0]["revenue"];
		index = getRevenueSize(revenue);
		var lookup = percentiles["Staff Management"][1][index];
		return convertToPercentage(lookup);
	},
	staffManagementLocationScore: function(){

	},
	strategicPlanningClassificationScore: function(){
		userID = Meteor.user()._id;
		classification = Origin.find( {$or: [{_id:userID},{organizational_classification:true}] }).fetch()[0]["organizational_classification"];
		var lookup = percentiles["Strategic Planning"][0][classifications[classification]];
		return convertToPercentage(lookup);
	},
	strategicPlanningRevenueScore: function(){
		userID = Meteor.user()._id;
		revenue = Origin.find( {$or: [{_id:userID},{revenue:true}] }).fetch()[0]["revenue"];
		index = getRevenueSize(revenue);
		var lookup = percentiles["Strategic Planning"][1][index];
		return convertToPercentage(lookup);
	},
	strategicPlanningLocationScore: function(){

	}
})

function getRevenueSize(revenue){
	if(revenue >= 0 && revenue <= 99999){
		return 0;
	}
	else if(revenue >= 100000 && revenue <= 349999){
		return 1;
	}
	else if(revenue >= 350000 && revenue <= 999999){
		return 2;
	}
	else if(revenue >= 1000000 && revenue <= 9999999){
		return 3;
	}
	else if(revenue >= 10000000){
		return 4;
	}
	return 0;
}

function convertToPercentage(arg){
	return (arg/4)*100;
}



