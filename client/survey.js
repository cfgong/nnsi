Origin = new Mongo.Collection("origin");


function calculateScores(scoreArray){
	var length = scoreArray.length;
	var sum = 0;
	for(var i = 0; i < scoreArray.length; i++){
		if(scoreArray[i] != NaN){
			if(scoreArray[i] != 0 && scoreArray[i] != 0.0000001){
				sum += (+scoreArray[i]);
			}
			else if (scoreArray[i] == 0 || scoreArray[i] == 0.0000001){
				length -= 1;
			}
		}	
	}
	var avg = sum/length;
	return avg;
}

Template.survey2.events({
	'submit form': function(event){
		event.preventDefault();
		Router.go('/survey3');	
	}
});

Template.survey3.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user(); //var userId = Meteor.user()._id;
		var doc = Origin.findOne(userId);  //findOne({_id: userId});
		var a = 'Executive Director or Senior Management';
		var b = 'Nonprofit Organization';
		var whoareyou = $('input:radio[name=whoareyou]:checked');
		var whoisyourorg = $('input:radio[name=whoisyourorg]:checked');
		console.log('userid is: ' + userId);
		if($(whoareyou).val()==a && $(whoisyourorg).val() == b){
			Origin.update(userId, {$set:{whoareyou: whoareyou.val(),whoisyourorg: whoisyourorg.val()}});
			Router.go('/survey4');
		}else{
			Router.go('/deadend');
		}
		
	}
});

Template.survey4.events({
	'submit form': function(event, template){
		event.preventDefault();
		var userId = Meteor.user();
		var doc = Origin.findOne(userId);
		var primaryAddress = $('input:radio[name=address]:checked').val();
		var selected = template.findAll('input[type=checkbox]:checked');
		var array = _.map(selected, function(item){
			return item.defaultValue;
		});
		Session.set("primaryAddress",primaryAddress);
		Session.set("selected", array);
		Origin.update(userId, {$set:{primaryAddress: primaryAddress,operatingCountries: array}});
		Router.go('/survey5');
	},
});


Template.survey4.rendered = function(){
	$("input:radio[name=address]").each(function(){
	   if($(this)[0].value == Session.get("primaryAddress")){
	   		$(this).attr("checked",'checked');
	   }
	});
	var tempArray = Session.get("selected");
	$("input[type=checkbox]").each(function(){
		// console.log($(this)[0].value);
		for (var i =0; i < tempArray.length; i++){
			// console.log(tempArray[i]);
			if($(this)[0].value == tempArray[i]){
				$(this).attr("checked",'checked');
			}
		}
	})
}

Template.survey5.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user();
		var doc = Origin.findOne(userId);
		var budget = $('input:text[name=budget]').val();
		var revenue = $('input:text[name=revenue]').val();
		var assets = $('input:text[name=assets]').val();

		Session.set("budget", budget);
		Session.set("revenue", revenue);
		Session.set("assets", assets);

		Origin.update(userId, {$set:{budget: budget, revenue: revenue, assets: assets} });
		Router.go('/survey6');
	}
});

Template.survey5.helpers({
	budget: function(){
		return Session.get("budget");
	},
	revenue: function(){
		return Session.get("revenue");
	},
	assets: function(){
		return Session.get("assets");
	},
	currency: function(){
		return Session.get("currency");
	}
})

Template.survey6.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user();
		var doc = Origin.findOne(userId);
		var organization_classification = $('input:radio[name=organizational_classification]:checked').val();

		Session.set("organization_classification", organization_classification);

		Origin.update(userId, {$set: {organizational_classification: organization_classification} });
		Router.go('/survey7');
	}
});

Template.survey6.rendered = function(){
	$("input:radio[name=organizational_classification]").each(function(){
	   if($(this)[0].value == Session.get("organization_classification")){
	   		$(this).attr("checked",'checked');
	   }
	});
}

Template.survey7.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user();
		var doc = Origin.findOne(userId);
		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var q3 = $('input:radio[name=inlineRadioOptions3]:checked').val();
		var q4 = $('input:radio[name=inlineRadioOptions4]:checked').val();
		var q5 = $('input:radio[name=inlineRadioOptions5]:checked').val();
		var q6 = $('input:radio[name=inlineRadioOptions6]:checked').val();
		var q7 = $('input:radio[name=inlineRadioOptions7]:checked').val();

		Session.set("7q1", q1);
		Session.set("7q2", q2);
		Session.set("7q3", q3);
		Session.set("7q4", q4);
		Session.set("7q5", q5);
		Session.set("7q6", q6);
		Session.set("7q7", q7);

		var scoreArray = [q1, q2, q3, q4, q5, q6, q7];
		var avg = calculateScores(scoreArray);

		Origin.update(userId, {$set: {financial_management: avg} });
		Router.go('/survey8');
	}
});

Template.survey7.rendered = function(){
	$("input:radio[name=inlineRadioOptions]").each(function(){
	   if($(this)[0].value == Session.get("7q1")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions2]").each(function(){
	   if($(this)[0].value == Session.get("7q2")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions3]").each(function(){
	   if($(this)[0].value == Session.get("7q3")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions4]").each(function(){
	   if($(this)[0].value == Session.get("7q4")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions5]").each(function(){
	   if($(this)[0].value == Session.get("7q5")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions6]").each(function(){
	   if($(this)[0].value == Session.get("7q6")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions7]").each(function(){
	   if($(this)[0].value == Session.get("7q7")){
	   		$(this).attr("checked",'checked');
	   }
	});
}


Template.survey8.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user();
		var doc = Origin.findOne(userId);

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();

		Session.set("8q1", q1);
		Session.set("8q2", q2);

		var scoreArray = [q1, q2];
		var avg = calculateScores(scoreArray);
		console.log("avg is: ", avg);
		Origin.update(userId, {$set: {financial_management2: avg} });

		Router.go('/survey9');
	}
});

Template.survey8.rendered = function(){
	$("input:radio[name=inlineRadioOptions]").each(function(){
	   if($(this)[0].value == Session.get("8q1")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions2]").each(function(){
	   if($(this)[0].value == Session.get("8q2")){
	   		$(this).attr("checked",'checked');
	   }
	});
}


Template.survey9.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user();
		var doc = Origin.findOne(userId);
		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var q3 = $('input:radio[name=inlineRadioOptions3]:checked').val();
		var q4 = $('input:radio[name=inlineRadioOptions4]:checked').val();
		var q5 = $('input:radio[name=inlineRadioOptions5]:checked').val();
		var q6 = $('input:radio[name=inlineRadioOptions6]:checked').val();
		var q7 = $('input:radio[name=inlineRadioOptions7]:checked').val();

		Session.set("9q1", q1);
		Session.set("9q2", q2);
		Session.set("9q3", q3);
		Session.set("9q4", q4);
		Session.set("9q5", q5);
		Session.set("9q6", q6);
		Session.set("9q7", q7);

		var scoreArray = [q1, q2, q3, q4, q5, q6, q7];
		var avg = calculateScores(scoreArray);
		Origin.update(userId, {$set: {adaptive_capacity: avg} });

		Router.go('/survey10');
	}
});

Template.survey9.rendered = function(){
	$("input:radio[name=inlineRadioOptions]").each(function(){
	   if($(this)[0].value == Session.get("9q1")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions2]").each(function(){
	   if($(this)[0].value == Session.get("9q2")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions3]").each(function(){
	   if($(this)[0].value == Session.get("9q3")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions4]").each(function(){
	   if($(this)[0].value == Session.get("9q4")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions5]").each(function(){
	   if($(this)[0].value == Session.get("9q5")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions6]").each(function(){
	   if($(this)[0].value == Session.get("9q6")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions7]").each(function(){
	   if($(this)[0].value == Session.get("9q7")){
	   		$(this).attr("checked",'checked');
	   }
	});
}


Template.survey10.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user();
		var doc = Origin.findOne(userId);

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var q3 = $('input:radio[name=inlineRadioOptions3]:checked').val();
		var q4 = $('input:radio[name=inlineRadioOptions4]:checked').val();
		var q5 = $('input:radio[name=inlineRadioOptions5]:checked').val();
		var q6 = $('input:radio[name=inlineRadioOptions6]:checked').val();

		Session.set("10q1", q1);
		Session.set("10q2", q2);
		Session.set("10q3", q3);
		Session.set("10q4", q4);
		Session.set("10q5", q5);
		Session.set("10q6", q6);

		var scoreArray = [q1, q2, q3, q4, q5, q6];
		var avg = calculateScores(scoreArray);
		Origin.update(userId, {$set: {strategic_planning: avg} });

		Router.go('/survey11');
	}
});

Template.survey10.rendered = function(){
	$("input:radio[name=inlineRadioOptions]").each(function(){
	   if($(this)[0].value == Session.get("10q1")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions2]").each(function(){
	   if($(this)[0].value == Session.get("10q2")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions3]").each(function(){
	   if($(this)[0].value == Session.get("10q3")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions4]").each(function(){
	   if($(this)[0].value == Session.get("10q4")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions5]").each(function(){
	   if($(this)[0].value == Session.get("10q5")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions6]").each(function(){
	   if($(this)[0].value == Session.get("10q6")){
	   		$(this).attr("checked",'checked');
	   }
	});
}

Template.survey11.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var q3 = $('input:radio[name=inlineRadioOptions3]:checked').val();
		var q4 = $('input:radio[name=inlineRadioOptions4]:checked').val();
		var q5 = $('input:radio[name=inlineRadioOptions5]:checked').val();
		var q6 = $('input:radio[name=inlineRadioOptions6]:checked').val();
		var q7 = $('input:radio[name=inlineRadioOptions7]:checked').val();

		Session.set("11q1", q1);
		Session.set("11q2", q2);
		Session.set("11q3", q3);
		Session.set("11q4", q4);
		Session.set("11q5", q5);
		Session.set("11q6", q6);
		Session.set("11q7", q7);

		var scoreArray = [q1, q2, q3, q4, q5, q6, q7];
		var avg = calculateScores(scoreArray);
		Origin.update({_id:doc._id}, {$set: {external_communication: avg} });

		Router.go('/survey12');
	}
});

Template.survey11.rendered = function(){
	$("input:radio[name=inlineRadioOptions]").each(function(){
	   if($(this)[0].value == Session.get("11q1")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions2]").each(function(){
	   if($(this)[0].value == Session.get("11q2")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions3]").each(function(){
	   if($(this)[0].value == Session.get("11q3")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions4]").each(function(){
	   if($(this)[0].value == Session.get("11q4")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions5]").each(function(){
	   if($(this)[0].value == Session.get("11q5")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions6]").each(function(){
	   if($(this)[0].value == Session.get("11q6")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions7]").each(function(){
	   if($(this)[0].value == Session.get("11q7")){
	   		$(this).attr("checked",'checked');
	   }
	});
}

Template.survey12.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var q3 = $('input:radio[name=inlineRadioOptions3]:checked').val();
		var q4 = $('input:radio[name=inlineRadioOptions4]:checked').val();
		var q5 = $('input:radio[name=inlineRadioOptions5]:checked').val();

		Session.set("12q1", q1);
		Session.set("12q2", q2);
		Session.set("12q3", q3);
		Session.set("12q4", q4);
		Session.set("12q5", q5);
	
		var scoreArray = [q1, q2, q3, q4, q5];
		var avg = calculateScores(scoreArray);
		Origin.update({_id:doc._id}, {$set: {board_leadership: avg} });


		Router.go('/survey13');
	}
});

Template.survey12.rendered = function(){
	$("input:radio[name=inlineRadioOptions]").each(function(){
	   if($(this)[0].value == Session.get("12q1")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions2]").each(function(){
	   if($(this)[0].value == Session.get("12q2")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions3]").each(function(){
	   if($(this)[0].value == Session.get("12q3")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions4]").each(function(){
	   if($(this)[0].value == Session.get("12q4")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions5]").each(function(){
	   if($(this)[0].value == Session.get("12q5")){
	   		$(this).attr("checked",'checked');
	   }
	});
}


Template.survey13.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();

		Session.set("13q1", q1);
		Session.set("13q2", q2);
	
		var scoreArray = [q1, q2];
		var avg = calculateScores(scoreArray);
		Origin.update({_id:doc._id}, {$set: {board_leadership2: avg} });

		Router.go('/survey14');
	}
});

Template.survey13.rendered = function(){
	$("input:radio[name=inlineRadioOptions]").each(function(){
	   if($(this)[0].value == Session.get("13q1")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions2]").each(function(){
	   if($(this)[0].value == Session.get("13q2")){
	   		$(this).attr("checked",'checked');
	   }
	});
}


Template.survey14.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var q3 = $('input:radio[name=inlineRadioOptions3]:checked').val();
		var q4 = $('input:radio[name=inlineRadioOptions4]:checked').val();
		var q5 = $('input:radio[name=inlineRadioOptions5]:checked').val();

		Session.set("14q1", q1);
		Session.set("14q2", q2);
		Session.set("14q3", q3);
		Session.set("14q4", q4);
		Session.set("14q5", q5);
	
		var scoreArray = [q1, q2, q3, q4, q5];
		var avg = calculateScores(scoreArray);
		Origin.update({_id:doc._id}, {$set: {operational_capacity: avg} });

		Router.go('/survey15');
	}
});

Template.survey14.rendered = function(){
	$("input:radio[name=inlineRadioOptions]").each(function(){
	   if($(this)[0].value == Session.get("14q1")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions2]").each(function(){
	   if($(this)[0].value == Session.get("14q2")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions3]").each(function(){
	   if($(this)[0].value == Session.get("14q3")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions4]").each(function(){
	   if($(this)[0].value == Session.get("14q4")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions5]").each(function(){
	   if($(this)[0].value == Session.get("14q5")){
	   		$(this).attr("checked",'checked');
	   }
	});
}

Template.survey15.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var q3 = $('input:radio[name=inlineRadioOptions3]:checked').val();
		var q4 = $('input:radio[name=inlineRadioOptions4]:checked').val();

		Session.set("15q1", q1);
		Session.set("15q2", q2);
		Session.set("15q3", q3);
		Session.set("15q4", q4);
	
		var scoreArray = [q1, q2, q3, q4];
		var avg = calculateScores(scoreArray);
		Origin.update({_id:doc._id}, {$set: {mission_orientation: avg} });

		Router.go('/survey16');
	}
});

Template.survey15.rendered = function(){
	$("input:radio[name=inlineRadioOptions]").each(function(){
	   if($(this)[0].value == Session.get("15q1")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions2]").each(function(){
	   if($(this)[0].value == Session.get("15q2")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions3]").each(function(){
	   if($(this)[0].value == Session.get("15q3")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions4]").each(function(){
	   if($(this)[0].value == Session.get("15q4")){
	   		$(this).attr("checked",'checked');
	   }
	});
}

Template.survey16.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var q3 = $('input:radio[name=inlineRadioOptions3]:checked').val();
		var q4 = $('input:radio[name=inlineRadioOptions4]:checked').val();

		Session.set("16q1", q1);
		Session.set("16q2", q2);
		Session.set("16q3", q3);
		Session.set("16q4", q4);
	
		var scoreArray = [q1, q2, q3, q4];
		var avg = calculateScores(scoreArray);
		Origin.update({_id:doc._id}, {$set: {staff_management: avg} });

		Router.go('/complete');
	}
});

Template.survey16.rendered = function(){
	$("input:radio[name=inlineRadioOptions]").each(function(){
	   if($(this)[0].value == Session.get("16q1")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions2]").each(function(){
	   if($(this)[0].value == Session.get("16q2")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions3]").each(function(){
	   if($(this)[0].value == Session.get("16q3")){
	   		$(this).attr("checked",'checked');
	   }
	});
	$("input:radio[name=inlineRadioOptions4]").each(function(){
	   if($(this)[0].value == Session.get("16q4")){
	   		$(this).attr("checked",'checked');
	   }
	});
}









