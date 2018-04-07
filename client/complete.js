Template.complete.helpers({
	setComplete: function(){
		var userId = Meteor.userId();
		var doc = Origin.findOne({_id: userId});
		Origin.update({_id: doc._id}, {$set:{isCompleted: true}});
	}
})
