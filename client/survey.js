Origin = new Mongo.Collection("origin");



Template.survey2.events({
	'submit form': function(event){
		event.preventDefault();
		Router.go('/survey3');	
	}
});

Template.survey3.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var a = 'Executive Director or Senior Management';
		var b = 'Nonprofit Organization';
		var whoareyou = $('input:radio[name=whoareyou]:checked');
		var whoisyourorg = $('input:radio[name=whoisyourorg]:checked');
		console.log('userid is: ' + userId);
		if($(whoareyou).val()==a && $(whoisyourorg).val() == b){
			Origin.insert({
				_id: userId,
				whoareyou: whoareyou.val(),
				whoisyourorg: whoisyourorg.val(),
				createdAt: new Date()
			});
			Router.go('/survey4');
		}else{
			Router.go('/deadend');
		}
		
	}
});

Template.survey4.events({
	'submit form': function(event, template){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});
		var primaryAddress = $('input:radio[name=address]:checked');
		var selected = template.findAll('input[type=checkbox]:checked');
		var array = _.map(selected, function(item){
			return item.defaultValue;
		});
		Origin.update({_id: doc._id}, {$set:{primaryAddress: primaryAddress.val(),operatingCountries: array}});
		Router.go('/survey5');
	}
});

Template.survey5.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});
		var budget = $('input:text[name=budget]').val();
		var revenue = $('input:text[name=revenue]').val();
		var assets = $('input:text[name=assets]').val();
		var currency = $('input:text[name=currency]').val();
		Origin.update({_id:doc._id}, {$set:{budget: budget, revenue: revenue, assets: assets, currency: currency} });
		Router.go('/survey6');
	}
});

Template.survey6.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});
		var organization_classification = $('input:radio[name=organizational_classification]:checked').val();
		Origin.update({_id:doc._id}, {$set: {organizational_classification: organization_classification} });

		Router.go('/survey7');
	}
});

Template.survey7.events({
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
		var sum = (+q1) + (+q2) + (+q3) + (+q4) + (+q5) + (+q6) + (+q7);
		var avg = sum/7;
		Origin.update({_id:doc._id}, {$set: {financial_management: avg} });
		Router.go('/survey8');
	}
});
Template.survey8.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var sum = (+q1) + (+q2);
		var avg = sum/2;
		Origin.update({_id:doc._id}, {$set: {financial_management2: avg} });

		Router.go('/survey9');
	}
});
Template.survey9.events({
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
		var sum = (+q1) + (+q2) + (+q3) + (+q4) + (+q5) + (+q6) + (+q7);
		var avg = sum/7;
		Origin.update({_id:doc._id}, {$set: {adaptive_capacity: avg} });

		Router.go('/survey10');
	}
});
Template.survey10.events({
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
		var sum = (+q1) + (+q2) + (+q3) + (+q4) + (+q5) + (+q6);
		var avg = sum/6;
		Origin.update({_id:doc._id}, {$set: {strategic_planning: avg} });

		Router.go('/survey11');
	}
});
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
		var sum = (+q1) + (+q2) + (+q3) + (+q4) + (+q5) + (+q6) + (+q7);
		var avg = sum/7;
		Origin.update({_id:doc._id}, {$set: {external_communication: avg} });

		Router.go('/survey12');
	}
});
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
	
		var sum = (+q1) + (+q2) + (+q3) + (+q4) + (+q5);
		var avg = sum/5;
		Origin.update({_id:doc._id}, {$set: {board_leadership: avg} });


		Router.go('/survey13');
	}
});
Template.survey13.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
	
		var sum = (+q1) + (+q2);
		var avg = sum/2;
		Origin.update({_id:doc._id}, {$set: {board_leadership2: avg} });

		Router.go('/survey14');
	}
});
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
	
		var sum = (+q1) + (+q2) + (+q3) + (+q4) + (+q5);
		var avg = sum/5;
		Origin.update({_id:doc._id}, {$set: {operational_capacity: avg} });

		Router.go('/survey15');
	}
});
Template.survey15.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var q3 = $('input:radio[name=inlineRadioOptions3]:checked').val();
		var q4 = $('input:radio[name=inlineRadioOptions4]:checked').val();
	
		var sum = (+q1) + (+q2) + (+q3) + (+q4);
		var avg = sum/4;
		Origin.update({_id:doc._id}, {$set: {mission_orientation: avg} });

		Router.go('/survey16');
	}
});
Template.survey16.events({
	'submit form': function(event){
		event.preventDefault();
		var userId = Meteor.user()._id;
		var doc = Origin.findOne({_id: userId});

		var q1 = $('input:radio[name=inlineRadioOptions]:checked').val();
		var q2 = $('input:radio[name=inlineRadioOptions2]:checked').val();
		var q3 = $('input:radio[name=inlineRadioOptions3]:checked').val();
		var q4 = $('input:radio[name=inlineRadioOptions4]:checked').val();
	
		var sum = (+q1) + (+q2) + (+q3) + (+q4);
		var avg = sum/4;
		Origin.update({_id:doc._id}, {$set: {staff_management: avg} });

		Router.go('/complete');
	}
});









