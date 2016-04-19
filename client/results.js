Template.results.helpers({

	rawScore: function(){
		//raw score is computed the average of the average scores of each section
		userID = Meteor.user()._id;
		financialManagement1 = Origin.find( {$or: [{_id:userID},{financial_management:true}] }).fetch()[0]["financial_management"];
		financialManagement2 = Origin.find( {$or: [{_id:userID},{financial_management:true}] }).fetch()[0]["financial_management2"];
		financialManagement =  (financialManagement1 + financialManagement2)/2;
		if(isNaN(financialManagement)){
			financialManagement = 0;
		}
		console.log("financialManagement is : " + financialManagement);

		adaptiveCapacity = Origin.find( {$or: [{_id:userID},{adaptive_capacity:true}] }).fetch()[0]["adaptive_capacity"];
		if(isNaN(adaptiveCapacity)){
			adaptiveCapacity = 0;
		}
		console.log("adaptiveCapacity is : " + adaptiveCapacity);

		strategicPlanning = Origin.find( {$or: [{_id:userID},{strategic_planning:true}] }).fetch()[0]["strategic_planning"];
		if(isNaN(strategicPlanning)){
			strategicPlanning = 0;
		}
		console.log("strategic_planning is : " + strategicPlanning);

		externalCommunication = Origin.find( {$or: [{_id:userID},{external_communication:true}] }).fetch()[0]["external_communication"];
		if(isNaN(externalCommunication)){
			externalCommunication = 0;
		}
		console.log("externalCommunication is : " + externalCommunication);

		boardLeadership1 = Origin.find( {$or: [{_id:userID},{board_leadership:true}] }).fetch()[0]["board_leadership"];
		boardLeadership2 = Origin.find( {$or: [{_id:userID},{board_leadership:true}] }).fetch()[0]["board_leadership2"];
		boardLeadership = (boardLeadership1 + boardLeadership2)/2;
		if(isNaN(boardLeadership)){
			boardLeadership = 0;
		}
		console.log("boardLeadership is : " + boardLeadership);

		operationalCapacity = Origin.find( {$or: [{_id:userID},{operational_capacity:true}] }).fetch()[0]["operational_capacity"];
		if(isNaN(operationalCapacity)){
			operationalCapacity = 0;
		}
		console.log("operationalCapacity is : " + operationalCapacity);

		missionOrientation = Origin.find( {$or: [{_id:userID},{mission_orientation:true}] }).fetch()[0]["mission_orientation"];
		if(isNaN(missionOrientation)){
			missionOrientation = 0;
		}
		console.log("missionOrientation is : " + missionOrientation);

		staffManagement = Origin.find( {$or: [{_id:userID},{staff_management:true}] }).fetch()[0]["staff_management"];
		if(isNaN(staffManagement)){
			staffManagement = 0;
		}
		console.log("staffManagement is : " + staffManagement);

		var avg = (financialManagement + adaptiveCapacity + strategicPlanning + externalCommunication + boardLeadership + operationalCapacity + missionOrientation + staffManagement)/8;
		Origin.update({_id:userID}, {$set: {rawScoreAvg: avg} });
		return Math.round(avg);
	}
})