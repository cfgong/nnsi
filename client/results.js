function convertToPercentage(arg){
	return (arg/4)*100;
}

var strengths = {
	adaptiveCapacity: "Your nonprofit is able to respond to and instigate change, with an aptitude for consideration of influences from the outside environment, network connectedness, inquisitiveness, and innovation.",
	boardLeadership: "The board has the ability to successfully lead your organization by setting the larger goals while maintaining the vision of the organization, minding potential pitfalls that may arise in your industry, and engaging your staff.",
	externalCommunication: "Your organization is capable of accurate, efficient communication with the outside world, allowing it to harness the power of those outside its organization through fundraising or partnership.",
	financialManagement: "Your organization is able to keep accurate financial records and maintain a budget.",
	missionOrientation: "The core values of your organization are reflected in your mission statement, which guides and instructs your staff and the actions of your nonprofit.",
	operationalCapacity: "Your organization uses measurable objectives and documented procedures to assess your success and adjusts your goals accordingly.",
	staffManagement: "Your organization has the capability to recruit, train, and manage talented employees.",
	strategicPlanning: "Your organization has the capability to set up and actually follow a long-term and realistic plan for the future. These plans are reflected in the actions and vision of the organization."
};

var weaknesses = {
	adaptiveCapacity: "Your nonprofit could improve in its ability to respond to and instigate change by focusing more on external focus, network connectedness, inquisitiveness and innovation.",
	boardLeadership: "The board can improve through better engaging the staff and employees of your organization and setting goals that accurately reflect your organization.",
	externalCommunication: "Your organization could improve its relations with the outside world through more accurate or more efficient communication, establishing relationships with the media, potential donors, and other supporters.",
	financialManagement: "Your organization should focus on improving its capability to document financial information and maintain a budget.",
	missionOrientation: "Your organization may be lacking in its ability reflect its core values through its mission statement and actions. You should focus on improving the connection between the vision of your nonprofit, the actions of your staff and your long term strategic planning.",
	operationalCapacity: "Your organization should focus on using pre-determined procedures to accurately and efficiently document your actions and your results, being sure to adjust your goals accordingly.",
	staffManagement: "Your organization may be lacking in its ability to attract and train competent staff. You could improve this weakness through focusing more on recruitment, retention, and management of talented potential employees.",
	strategicPlanning: "Your organization could improve its ability to set up and carry out long term, realistic plans that reflect your core values and mission, perhaps through breaking up long term goals into short-term steps."
};

var mapping = {
	0: "Adaptive Capacity",
	1: "Board Leadership",
	2: "External Communication",
	3: "Financial Management",
	4: "Mission Orientation",
	5: "Operational Capacity",
	6: "Staff Management",
	7: "Strategic Planning"
};

var mapping2 = {
	"Adaptive Capacity": "adaptiveCapacity",
	"Board Leadership": "boardLeadership",
	"External Communication": "externalCommunication",
	"Financial Management": "financialManagement",
	"Mission Orientation": "missionOrientation",
	"Operational Capacity" : "operationalCapacity",
	"Staff Management": "staffManagement",
	"Strategic Planning": "strategicPlanning"
};
var scores = [];
var scores2 = [];
var scores3 = [];
var scores4 = [];
Template.results.helpers({

	adaptiveCapacityScore: function(){
		userID = Meteor.user()._id;
		adaptiveCapacity = Origin.find( {$or: [{_id:userID},{adaptive_capacity:true}] }).fetch()[0]["adaptive_capacity"];
		if(isNaN(adaptiveCapacity)){
			adaptiveCapacity = 0;
		}
		// console.log("adaptiveCapacity is : " + adaptiveCapacity);
		adaptiveCapacity = convertToPercentage(adaptiveCapacity);
		scores["adaptiveCapacity"] = adaptiveCapacity;
		Session.set("adaptiveCapacity", adaptiveCapacity);
		// Origin.update({_id:userID}, {$set: {adaptiveCapacityScore: adaptiveCapacity} });
		// console.log("adaptiveCapacityScore is: ", adaptiveCapacity);
		return adaptiveCapacity;
	},
	boardLeadershipScore: function(){
		userID = Meteor.user()._id;
		boardLeadership1 = Origin.find( {$or: [{_id:userID},{board_leadership:true}] }).fetch()[0]["board_leadership"];
		boardLeadership2 = Origin.find( {$or: [{_id:userID},{board_leadership:true}] }).fetch()[0]["board_leadership2"];
		boardLeadership = (boardLeadership1 + boardLeadership2)/2;
		if(isNaN(boardLeadership)){
			boardLeadership = 0;
		}
		// console.log("boardLeadership is : " + boardLeadership);
		boardLeadership = convertToPercentage(boardLeadership);
		scores["boardLeadership"] = boardLeadership;
		Session.set("boardLeadership", boardLeadership);
		return boardLeadership;
	},
	externalCommunicationScore: function(){
		userID = Meteor.user()._id;
		externalCommunication = Origin.find( {$or: [{_id:userID},{external_communication:true}] }).fetch()[0]["external_communication"];
		if(isNaN(externalCommunication)){
			externalCommunication = 0;
		}
		// console.log("externalCommunication is : " + externalCommunication);
		externalCommunication = convertToPercentage(externalCommunication);
		scores["externalCommunication"] = externalCommunication;
		Session.set("externalCommunication",externalCommunication);
		return externalCommunication;
	},
	financialManagementScore: function(){
		userID = Meteor.user()._id;
		financialManagement1 = Origin.find( {$or: [{_id:userID},{financial_management:true}] }).fetch()[0]["financial_management"];
		financialManagement2 = Origin.find( {$or: [{_id:userID},{financial_management:true}] }).fetch()[0]["financial_management2"];
		financialManagement =  (financialManagement1 + financialManagement2)/2;
		if(isNaN(financialManagement)){
			financialManagement = 0;
		}
		// console.log("financialManagement is : " + financialManagement);
		financialManagement = convertToPercentage(financialManagement);
		scores["financialManagement"] = financialManagement;
		Session.set("financialManagement", financialManagement);
		return financialManagement;
	},
	missionOrientationScore: function(){
		userID = Meteor.user()._id;
		missionOrientation = Origin.find( {$or: [{_id:userID},{mission_orientation:true}] }).fetch()[0]["mission_orientation"];
		if(isNaN(missionOrientation)){
			missionOrientation = 0;
		}
		// console.log("missionOrientation is : " + missionOrientation);
		missionOrientation = convertToPercentage(missionOrientation);
		scores["missionOrientation"] = missionOrientation;
		Session.set("missionOrientation", missionOrientation);
		return missionOrientation;
	},
	operationalCapacityScore: function(){
		userID = Meteor.user()._id;
		operationalCapacity = Origin.find( {$or: [{_id:userID},{operational_capacity:true}] }).fetch()[0]["operational_capacity"];
		if(isNaN(operationalCapacity)){
			operationalCapacity = 0;
		}
		// console.log("operationalCapacity is : " + operationalCapacity);
		operationalCapacity = convertToPercentage(operationalCapacity);
		scores["operationalCapacity"] = operationalCapacity;
		Session.set("operationalCapacity", operationalCapacity);
		return operationalCapacity;
	},
	staffManagementScore: function(){
		userID = Meteor.user()._id;
		staffManagement = Origin.find( {$or: [{_id:userID},{staff_management:true}] }).fetch()[0]["staff_management"];
		if(isNaN(staffManagement)){
			staffManagement = 0;
		}
		// console.log("staffManagement is : " + staffManagement);
		staffManagement = convertToPercentage(staffManagement);
		scores["staffManagement"] = staffManagement;
		Session.set("staffManagement", staffManagement);
		return staffManagement;
	},
	strategicPlanningScore: function(){
		userID = Meteor.user()._id;
		strategicPlanning = Origin.find( {$or: [{_id:userID},{strategic_planning:true}] }).fetch()[0]["strategic_planning"];
		if(isNaN(strategicPlanning)){
			strategicPlanning = 0;
		}
		// console.log("strategic_planning is : " + strategicPlanning);
		strategicPlanning = convertToPercentage(strategicPlanning);
		scores["strategicPlanning"] = strategicPlanning;
		Session.set("strategicPlanning", strategicPlanning);
		return strategicPlanning;
	},
	firstStrength: function(){
		scores.push(Session.get("adaptiveCapacity"));
		scores.push(Session.get("boardLeadership"));
		scores.push(Session.get("externalCommunication"));
		scores.push(Session.get("financialManagement"));
		scores.push(Session.get("missionOrientation"));
		scores.push(Session.get("operationalCapacity"));
		scores.push(Session.get("staffManagement"));
		scores.push(Session.get("strategicPlanning"));

		largest = Math.max.apply(Math, scores);
		var i = scores.indexOf(largest);
		name = mapping[i];
		return name + ". " + strengths[mapping2[name]];
	},
	secondStrength: function(){
		scores2.push(Session.get("adaptiveCapacity"));
		scores2.push(Session.get("boardLeadership"));
		scores2.push(Session.get("externalCommunication"));
		scores2.push(Session.get("financialManagement"));
		scores2.push(Session.get("missionOrientation"));
		scores2.push(Session.get("operationalCapacity"));
		scores2.push(Session.get("staffManagement"));
		scores2.push(Session.get("strategicPlanning"));
		largest = Math.max.apply(Math, scores2);
		var i = scores2.indexOf(largest);
		scores2.splice(i,1);
		largest = Math.max.apply(Math, scores2);
		var j = scores2.indexOf(largest);

		// SPAGETHTTI AF
		name = mapping[j+1];
		return name + ". " + strengths[mapping2[name]];
	},
	firstWeakness: function(){
		scores3.push(Session.get("adaptiveCapacity"));
		scores3.push(Session.get("boardLeadership"));
		scores3.push(Session.get("externalCommunication"));
		scores3.push(Session.get("financialManagement"));
		scores3.push(Session.get("missionOrientation"));
		scores3.push(Session.get("operationalCapacity"));
		scores3.push(Session.get("staffManagement"));
		scores3.push(Session.get("strategicPlanning"));

		smallest = Math.min.apply(Math, scores3);
		var i = scores3.indexOf(smallest);
		var name = mapping[i];
		console.log("first weakness is: ", name);
		return name + ". " + weaknesses[mapping2[name]];
	},
	secondWeakness:function(){
		scores4.push(Session.get("adaptiveCapacity"));
		scores4.push(Session.get("boardLeadership"));
		scores4.push(Session.get("externalCommunication"));
		scores4.push(Session.get("financialManagement"));
		scores4.push(Session.get("missionOrientation"));
		scores4.push(Session.get("operationalCapacity"));
		scores4.push(Session.get("staffManagement"));
		scores4.push(Session.get("strategicPlanning"));

		smallest = Math.min.apply(Math, scores4);
		var i = scores4.indexOf(smallest);
		scores4.splice(i,1);
		smallest = Math.min.apply(Math, scores4);
		var j = scores4.indexOf(smallest);

		// SPAGETHTTI AF
		name = mapping[j+1];
		return name + ". " + weaknesses[mapping2[name]];
	}

			// Origin.update({_id:userID}, {$set: {rawScoreAvg: avg} });
});



	