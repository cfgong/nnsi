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
			Router.go('/deadend');
		}else{
			Origin.insert({
				_id: userId,
				whoareyou: whoareyou.val(),
				whoisyourorg: whoisyourorg.val(),
				createdAt: new Date()
			});
			Router.go('/survey4');
		}
		
	}
});